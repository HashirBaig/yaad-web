import React from "react"

function MediumCard(props) {
  const { message, date, time } = props
  return (
    <div className="border px-4 py-3 rounded-lg">
      <div className="flex items-center justify-between">
        <p className="w-fit text-gray-500 font-extralight text-xs">{date}</p>

        {/* <TrashIcon handleOnClick={handleOnClick} /> */}
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
