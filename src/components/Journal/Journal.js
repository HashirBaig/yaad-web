import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"

import JournalList from "../JournalList"
import JournalForm from "../JournalForm"

import { getAllJournalsByUser } from "../../redux/features/services/api"
import { setJournals } from "../../redux/features/journal/journalSlice"

function Journal() {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

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

  return (
    <div>
      <JournalList initSearch={() => initSearch()} isLoading={isLoading} />
      <JournalForm initSearch={() => initSearch()} />
    </div>
  )
}

export default Journal
