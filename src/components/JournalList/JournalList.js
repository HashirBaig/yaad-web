import PorpTypes from "prop-types"
import { useSelector } from "react-redux"
import dayjs from "dayjs"

import MediumCard from "../MediumCard"
import { Spinner } from "../Loaders"

function JournalList({ isLoading, initSearch }) {
  const { journals } = useSelector(state => state.journal)

  const isScrollbarVisible = journals?.length > 4

  return (
    <div
      className={`w-full h-[545px]  md:h-[460px] space-y-2 py-3 px-4 ${
        isScrollbarVisible
          ? `scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-slate-800 scrollbar-thumb-rounded-full h-[545px] sm:h-[460px] overflow-y-scroll`
          : `scrollbar-hide`
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
        journals?.map(({ message, createdAt, id, isContentEditable, isEdited }, idx) => {
          const date = dayjs(new Date(createdAt)).format("DD-MM-YY")
          return (
            <MediumCard
              message={message}
              date={date}
              id={id}
              createdAt={createdAt}
              isContentEditable={isContentEditable}
              isEdited={isEdited}
              key={`journal-${id}-${idx}`}
              initSearch={() => initSearch()}
            />
          )
        })}
    </div>
  )
}

JournalList.porpTypes = {
  isLoading: PorpTypes.bool.isRequired,
  initSearch: PorpTypes.func.isRequired,
}

export default JournalList
