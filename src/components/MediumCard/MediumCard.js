import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import PorpTypes from "prop-types"
import TimeAgo from "react-timeago"
import { TrashIcon, PencilAltIcon } from "@heroicons/react/outline"

import { Spinner } from "../Loaders"

import { softDeleteJournal } from "../../redux/features/services/api"
import { setJournals } from "../../redux/features/journal/journalSlice"

function MediumCard(props) {
  const { message, date, id, createdAt, isContentEditable, initSearch } = props
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const { journals } = useSelector(state => state.journal)

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
      if (journal._id === id) {
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

  // const handleUpdateJournal = () => {}

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
        <p
        // className={`${isContentEditable ? `outline-none bg-gray-100 rounded-lg px-4 py-2` : ``}`}
        >
          {message}
        </p>
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
