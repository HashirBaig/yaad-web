import React from "react"
import MediumCard from "../MediumCard"
import { useJournals } from "../../services/swrHooks"
import dayjs from "dayjs"
import { Spinner } from "../Loaders"

function JournalList() {
  const { journals, isLoading } = useJournals()
  const isScrollbarVisible = journals?.length > 4

  return (
    <div
      className={`w-full h-[545px]  md:h-[455px] space-y-2 py-3 px-4 ${
        isScrollbarVisible ? `overflow-hidden overflow-y-scroll` : `scrollbar-hide`
      } `}
    >
      {isLoading && journals.length === 0 && <Spinner size={"lg"} />}
      {!isLoading &&
        journals.length > 0 &&
        journals?.map(({ message, createdAt, _id }, idx) => {
          const date = dayjs(new Date(createdAt)).format("DD-MM-YY")
          const time = dayjs(new Date(createdAt)).format("hh:mm A")
          return <MediumCard message={message} date={date} time={time} id={_id} key={`journal-${_id}-${idx}`} />
        })}
    </div>
  )
}

export default JournalList
