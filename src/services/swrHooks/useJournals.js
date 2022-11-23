import useSWR from "swr"
import fetcher from "../fetcher"

const useJournals = () => {
  const key = "http://localhost:5000/api/journal"
  const { data, error, revalidate, isValidating, mutate } = useSWR(key, fetcher)

  return {
    journals: data?.journals || [],
    isLoading: !error && !data,
    error,
    getJournals: revalidate,
    isValidating,
    mutateJournals: mutate,
  }
}

export default useJournals
