import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import PorpTypes from "prop-types"
import TimeAgo from "react-timeago"
import { TrashIcon, PencilAltIcon } from "@heroicons/react/outline"

import { Spinner } from "../Loaders"

import { softDeleteJournal, updateJournal } from "../../redux/features/services/api"
import { setJournals } from "../../redux/features/journal/journalSlice"

const schema = yup.object().shape({
  message: yup.string(),
})

function MediumCard(props) {
  const { message, date, id, createdAt, isContentEditable, initSearch } = props
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const { journals } = useSelector(state => state.journal)

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: {
      message: message,
    },
  })

  const handleOnClick = async () => {
    try {
      setIsLoading(true)
      await softDeleteJournal(id)
      initSearch()
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
      const data = { id, ...formData }
      await updateJournal(data)
      toggleJournalEdit()
      initSearch()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="border px-4 py-3 rounded-lg">
      <div className="flex items-center justify-between">
        <p className="w-fit text-gray-500 font-extralight text-xs">{date}</p>

        <div className="flex ">
          {!isContentEditable && (
            <div className="action-icon edit-icon" title="Edit Entry" onClick={toggleJournalEdit}>
              <PencilAltIcon className="h-5 w-5" />
            </div>
          )}
          {isLoading ? (
            <Spinner size={"sm"} color="danger" />
          ) : (
            <div className="action-icon delete-icon" onClick={handleOnClick} title="Delete Entry">
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
                className="bg-blue-400 hover:bg-blue-600 text-white rounded-lg py-1 px-4 text-sm font-medium transition duration-200 ease-out cursor-pointer"
              >
                Edit
              </button>
            </div>
          </form>
        ) : (
          <p>{message}</p>
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
