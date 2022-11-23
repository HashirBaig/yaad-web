import React from "react"
import { TrashIcon } from "@heroicons/react/outline"

function MediumCard(props) {
  const { message, date, time } = props
  return (
    <div className="border px-4 py-3 rounded-lg">
      <div className="flex items-center justify-between">
        <p className="w-fit text-gray-500 font-extralight text-xs">{date}</p>

        <div className="hover:bg-red-400 hover:text-white text-red-400 rounded-full p-1 cursor-pointer transition duration-200 ease-in-out">
          <TrashIcon className="h-5 w-5" />
        </div>
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

export default MediumCard
