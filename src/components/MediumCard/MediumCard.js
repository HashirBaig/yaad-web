import React from "react"
import PorpTypes from "prop-types"
import { TrashIcon } from "@heroicons/react/outline"
import { Spinner } from "../Loaders"
import { useDispatch, useSelector } from "react-redux"
import { softDeleteJournal, reset } from "../../redux/features/journal/journalSlice"

function MediumCard(props) {
  const { message, date, time, id } = props
  const dispatch = useDispatch()
  const { isLoading } = useSelector(state => state.journal)

  const handleOnClick = async () => {
    try {
      dispatch(softDeleteJournal(id))
      dispatch(reset())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="border px-4 py-3 rounded-lg">
      <div className="flex items-center justify-between">
        <p className="w-fit text-gray-500 font-extralight text-xs">{date}</p>

        {isLoading ? (
          <Spinner size={"sm"} color="danger" />
        ) : (
          <div className="delete-icon" onClick={handleOnClick}>
            <TrashIcon className="h-5 w-5" />
          </div>
        )}
      </div>
      <div>
        <p>{message}</p>
      </div>
      <div className="flex justify-end">
        <p className="w-fit text-gray-500 font-extralight text-xs">{time}</p>
      </div>
    </div>
  )
}

MediumCard.porpTypes = {
  message: PorpTypes.string.isRequired,
  date: PorpTypes.string.isRequired,
  time: PorpTypes.string.isRequired,
  id: PorpTypes.string.isRequired,
}

export default MediumCard
