import React, { useEffect } from "react"
import MediumCard from "../MediumCard"
import dayjs from "dayjs"
import { Spinner } from "../Loaders"

function JournalList({ initSearch, journals, isLoading }) {
  useEffect(() => {
    initSearch()

    // eslint-disable-next-line
  }, [])

  const isScrollbarVisible = journals?.length > 4

  return (
    <div
      className={`w-full h-[545px]  md:h-[455px] space-y-2 py-3 px-4 ${
        isScrollbarVisible ? `overflow-hidden overflow-y-scroll` : `scrollbar-hide`
      } `}
    >
      {isLoading && journals.length === 0 && <Spinner size={"lg"} />}
      {!isLoading && journals.length === 0 && (
        <div className="min-h-full flex items-center justify-center">
          <p className="font-semibold text-sm italic text-gray-500">Write what's on your mind!</p>
        </div>
      )}
      {!isLoading &&
        journals.length > 0 &&
        journals?.map(({ message, createdAt, _id }, idx) => {
          const date = dayjs(new Date(createdAt)).format("DD-MM-YY")
          const time = dayjs(new Date(createdAt)).format("hh:mm A")
          return (
            <MediumCard
              message={message}
              date={date}
              time={time}
              id={_id}
              key={`journal-${_id}-${idx}`}
              initSearch={() => initSearch()}
            />
          )
        })}
    </div>
  )
}

export default JournalList
