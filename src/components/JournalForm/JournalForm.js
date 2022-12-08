import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { addJournal } from "../../redux/features/services/api"
import { useSelector } from "react-redux"

const schema = yup.object().shape({
  message: yup.string(),
})

function JournalForm({ initSearch }) {
  const { user } = useSelector(state => state.auth)

  const onSubmit = async formData => {
    try {
      const data = {
        isDeleted: false,
        isEdited: false,
        createdBy: user?.email,
        createdAt: new Date().toISOString(),
        ...formData,
      }

      reset()
      await addJournal(data)
      initSearch()
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
