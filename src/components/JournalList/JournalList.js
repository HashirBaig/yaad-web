import React from "react"
import MediumCard from "../MediumCard"
import { useJournals } from "../../services/swrHooks"
import dayjs from "dayjs"

function JournalList() {
  const { journals } = useJournals()

  return (
    <div className="w-full h-[440px] space-y-2 mt-2 px-2 overflow-hidden overflow-y-scroll">
      {journals?.map(({ message, createdAt, _id }, idx) => {
        const date = dayjs(new Date(createdAt)).format("DD-MM-YY")
        const time = dayjs(new Date(createdAt)).format("hh:mm A")
        return <MediumCard message={message} date={date} time={time} id={_id} key={`journal-${_id}`} />
      })}
    </div>
  )
}

export default JournalList
