import React, { useState } from "react"
import PorpTypes from "prop-types"
import { TrashIcon } from "@heroicons/react/outline"
import { Spinner } from "../Loaders"

function MediumCard(props) {
  const { message, date, time, id } = props
  const [isLoading, setIsLoading] = useState(false)

  const handleOnClick = async () => {
    try {
      setIsLoading(true)
      console.log("Soft delete journal with id: ", id)
      // await softDeleteJournal({ id })
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
