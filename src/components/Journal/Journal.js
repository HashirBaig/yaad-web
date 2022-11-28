import { useState } from "react"

import JournalList from "../JournalList"
import JournalForm from "../JournalForm"

import { getAllJournalsByUser } from "../../redux/features/services/api"

function Journal() {
  const [isLoading, setIsLoading] = useState(false)
  const [journals, setJournals] = useState([])

  const initSearch = async () => {
    try {
      setIsLoading(true)
      const res = await getAllJournalsByUser()
      setJournals(res?.data?.journals)
    } catch (error) {
      console.log(error || error?.message)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <JournalList journals={journals} initSearch={() => initSearch()} isLoading={isLoading} />
      <JournalForm initSearch={() => initSearch()} />
    </div>
  )
}

export default Journal
