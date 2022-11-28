import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"

import { addJournal } from "../../redux/features/services/api"

const schema = yup.object().shape({
  message: yup.string(),
})

function JournalForm({ initSearch }) {
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: {
      message: "",
    },
  })

  const onSubmit = async formData => {
    try {
      await addJournal(formData)
      reset()
      initSearch()
    } catch (error) {
      console.log(error)
    }
  }

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
