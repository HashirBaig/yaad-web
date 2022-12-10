import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import PorpTypes from "prop-types"
import TimeAgo from "react-timeago"
import { TrashIcon, PencilAltIcon } from "@heroicons/react/outline"

import { Spinner } from "../Loaders"

import { softDeleteJournal, updateJournal, getAllJournalsByUser } from "../../redux/features/services/api"
import { setJournals } from "../../redux/features/journal/journalSlice"
import { getPreppedData } from "../../utils/common"

const schema = yup.object().shape({
  message: yup.string(),
})

function MediumCard(props) {
  const { message, date, id, createdAt, isContentEditable } = props
  const [isLoading, setIsLoading] = useState(false)
  const [isEditLoading, setIsEditLoading] = useState(false)
  const dispatch = useDispatch()

  const { journals } = useSelector(state => state.journal)
  const { user } = useSelector(state => state.auth)

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: {
      message: message,
    },
  })

  const handleSoftDelete = async () => {
    try {
      setIsLoading(true)
      //--- OPTIMISTIC UPDATE FOR SOFT DELETE ---//
      const updatedData = journals?.filter(journal => journal?.id !== id)
      dispatch(setJournals(updatedData))
      await softDeleteJournal(id)

      // Get lastest journal entries
      const res = await getAllJournalsByUser(user?.email)
      const preppedData = getPreppedData(res)
      dispatch(setJournals(preppedData))
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleJournalEdit = () => {
    const updatedJournalData = journals.map(journal => {
      if (journal.id === id) {
        const { isContentEditable, ...rest } = journal
        const editedJournal = {
          isContentEditable: !isContentEditable,
          ...rest,
        }
        return editedJournal
      }
      return journal
    })
    dispatch(setJournals(updatedJournalData))
  }

  const onSubmit = async formData => {
    try {
      setIsEditLoading(true)
      const data = { id, ...formData }
      // Toggle Edit Form
      toggleJournalEdit()

      //--- OPTIMISTIC UPDATE FOR SOFT DELETE ---//
      const updatedData = journals?.map(({ message, ...rest }) =>
        rest?.id === id ? { message: data?.message, ...rest } : { message, ...rest }
      )
      dispatch(setJournals(updatedData))

      await updateJournal(data)

      // Get lastest journal entries
      const res = await getAllJournalsByUser(user?.email)
      const preppedData = getPreppedData(res)
      dispatch(setJournals(preppedData))
    } catch (error) {
      setIsEditLoading(false)
      console.log(error)
    } finally {
      setIsEditLoading(false)
    }
  }

  return (
    <div className="border border-slate-700 px-4 py-3 rounded-lg">
      <div className="flex items-center justify-between">
        <p className="w-fit text-slate-500 font-extralight text-xs">{date}</p>

        <div className="flex ">
          {!isContentEditable && (
            <div className="btn-action btn-edit" title="Edit Entry" onClick={toggleJournalEdit}>
              <PencilAltIcon className="h-5 w-5" />
            </div>
          )}
          {isLoading ? (
            <Spinner size={"sm"} color="danger" />
          ) : (
            <div className="btn-action btn-delete" onClick={handleSoftDelete} title="Delete Entry">
              <TrashIcon className="h-5 w-5" />
            </div>
          )}
        </div>
      </div>
      <div className={`${isContentEditable ? `space-y-2 pb-2` : ``}`}>
        {isContentEditable ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-2">
              <input type="text" {...register("message")} />
            </div>
            <div className="w-full flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={toggleJournalEdit}
                className="bg-red-400 hover:bg-red-600 text-white rounded-lg py-1 px-4 text-sm font-medium transition duration-200 ease-out cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isEditLoading}
                className="bg-blue-400 hover:bg-blue-600 text-white rounded-lg py-1 px-4 text-sm font-medium transition duration-200 ease-out cursor-pointer"
              >
                {isEditLoading ? <Spinner size={"xs"} color="light" /> : "Edit"}
              </button>
            </div>
          </form>
        ) : (
          <p onDoubleClick={toggleJournalEdit} className="text-slate-400">
            {message}
          </p>
        )}
      </div>
      <div className="flex justify-end">
        <p className="w-fit text-gray-500 font-extralight text-xs">
          <TimeAgo date={new Date(createdAt)} />
        </p>
      </div>
    </div>
  )
}

MediumCard.porpTypes = {
  message: PorpTypes.string.isRequired,
  createdAt: PorpTypes.string.isRequired,
  date: PorpTypes.string.isRequired,
  id: PorpTypes.string.isRequired,
  isContentEditable: PorpTypes.bool.isRequired,
}

export default MediumCard
