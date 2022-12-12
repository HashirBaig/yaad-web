import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { customAlphabet } from "nanoid"
import { addJournal, getAllJournalsByUser } from "../../redux/features/services/api"
import { useSelector, useDispatch } from "react-redux"
import { getPreppedData } from "../../utils/common"
import { PaperAirplaneIcon } from "@heroicons/react/solid"
import { setJournals } from "../../redux/features/journal/journalSlice"
import { createStreak } from "../../redux/features/streak/streakSlice"

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

      // if streak already present, check for validity
      // else create a new one
      // Create Streak
      dispatch(createStreak(streakData))
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
