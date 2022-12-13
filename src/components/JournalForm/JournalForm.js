import * as yup from "yup"
import dayjs from "dayjs"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { customAlphabet } from "nanoid"
import { addJournal, getAllJournalsByUser, getStreakByUser } from "../../redux/features/services/api"
import { useSelector, useDispatch } from "react-redux"
import { PaperAirplaneIcon } from "@heroicons/react/solid"
import { setJournals } from "../../redux/features/journal/journalSlice"
import { createStreak, breakStreak, updateStreak, getStreak } from "../../redux/features/streak/streakSlice"
import { getPreppedData, getFormattedYesterday, getFormattedDayBeforeYesterday } from "../../utils/common"

const schema = yup.object().shape({
  message: yup.string(),
})

function JournalForm({ initSearch }) {
  const { user } = useSelector(state => state.auth)
  const { journals } = useSelector(state => state.journal)

  const dispatch = useDispatch()

  const onSubmit = async formData => {
    try {
      const data = {
        isDeleted: false,
        isEdited: false,
        createdBy: user?.email,
        createdAt: new Date().toISOString(),
        ...formData,
      }

      const streakData = {
        isBroken: false,
        user: user?.email,
        createdAt: new Date().toISOString(),
        noOfDays: 1,
      }

      reset()

      //--- OPTIMISTIC UPDATE ---//
      const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 10)
      const obj = {
        journalId: nanoid,
        isContentEditable: false,
        ...data,
      }
      const newData = [obj, ...journals]
      dispatch(setJournals(newData))
      await addJournal(data)

      // Get lastest journal entries
      const res = await getAllJournalsByUser(user?.email)
      const preppedData = getPreppedData(res)
      dispatch(setJournals(preppedData))

      // check for streak validity
      // TODO: ADD OPTIMISTIC UPDATE FOR STREAKS FOR FASTER UI UPDATE
      const { id } = await getStreakByUser(user?.email)
      const { createdAt } = await getAllJournalsByUser(data?.createdBy, 1)
      const journalDate = dayjs(createdAt).format("DD-MM-YYYY")

      if (journalDate === getFormattedYesterday()) {
        dispatch(getStreak({ userEmail: user?.email }))
      }

      if (journalDate === getFormattedDayBeforeYesterday) {
        dispatch(breakStreak({ userEmail: user?.email }))
        dispatch(createStreak(streakData))
      }

      dispatch(updateStreak({ id }))
    } catch (error) {
      console.log(error)
    }
  }

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: {
      message: "",
    },
  })

  return (
    <div className="sticky bottom-0">
      <form className="journal-entry-form" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" name="message" autoComplete="off" {...register("message")} />
        <button className="btn-send sm:hidden" type="submit">
          <PaperAirplaneIcon className="h-8 w-8" />
        </button>
      </form>
    </div>
  )
}

export default JournalForm
