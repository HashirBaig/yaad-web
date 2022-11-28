import React, { useState } from "react"
import PorpTypes from "prop-types"
import TimeAgo from "react-timeago"
import { TrashIcon } from "@heroicons/react/outline"
import { Spinner } from "../Loaders"
import { softDeleteJournal } from "../../redux/features/services/api"

function MediumCard(props) {
  const [isLoading, setIsLoading] = useState(false)
  const { message, date, id, createdAt, initSearch } = props

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
        {/* <p className="w-fit text-gray-500 font-extralight text-xs">{time}</p> */}
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
}

export default MediumCard
