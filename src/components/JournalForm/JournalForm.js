import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { addJournal } from "../../redux/features/services/api"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { createStreakByUser } from "../../redux/features/streak/streakSlice"
import { today, getFormattedYesterday, getFormattedDayBeforeYesterday } from "../../utils/common"

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
        userEmail: user?.email,
        ...formData,
      }
      reset()
      await addJournal(data)
      initSearch()

      // Handle streak updates
      // if already streak present, then check if new journal was entered today, yesterday
      // the day before yesterday
      console.log(journals[0])
      dispatch(createStreakByUser(user?.email))

      // Set streak updates
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
        <button className="btn hidden sm:block" type="submit">
          Send
        </button>
      </form>
    </div>
  )
}

export default JournalForm
