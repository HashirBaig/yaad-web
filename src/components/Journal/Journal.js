import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllJournalsByUser } from "../../redux/features/services/api"
import { setJournals } from "../../redux/features/journal/journalSlice"

import JournalList from "../JournalList"
import JournalForm from "../JournalForm"

import { getPreppedData } from "../../utils/common"

function Journal() {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  const initSearch = async () => {
    try {
      setIsLoading(true)
      const res = await getAllJournalsByUser(user?.email)
      const data = getPreppedData(res)
      dispatch(setJournals(data))
    } catch (error) {
      console.log(error || error?.message)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    initSearch()

    // eslint-disable-next-line
  }, [user])

  return (
    <div>
      <JournalList isLoading={isLoading} initSearch={() => initSearch()} />
      <JournalForm initSearch={() => initSearch()} />
    </div>
  )
}

export default Journal
