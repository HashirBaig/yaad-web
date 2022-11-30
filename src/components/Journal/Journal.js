import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"

import JournalList from "../JournalList"
import JournalForm from "../JournalForm"

import { getAllJournalsByUser, addJournal } from "../../redux/features/services/api"
import { setJournals } from "../../redux/features/journal/journalSlice"

const schema = yup.object().shape({
  message: yup.string(),
})

function Journal() {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: {
      message: "",
    },
  })

  const initSearch = async () => {
    try {
      setIsLoading(true)
      const res = await getAllJournalsByUser()
      const data = dataPrep(res?.data?.journals)
      dispatch(setJournals(data))
    } catch (error) {
      console.log(error || error?.message)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  const dataPrep = data => {
    return data?.map(item => ({ isContentEditable: false, ...item }))
  }

  useEffect(() => {
    initSearch()

    // eslint-disable-next-line
  }, [])

  const onSubmit = async formData => {
    try {
      const data = { ...formData }
      reset()
      await addJournal(data)
      initSearch()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <JournalList initSearch={() => initSearch()} isLoading={isLoading} />
      <JournalForm handleSubmit={handleSubmit(onSubmit)} register={register} />
    </div>
  )
}

export default Journal
