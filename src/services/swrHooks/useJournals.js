import useSWR from "swr"
import fetcher from "../fetcher"
import environment from "../../config/environment"
import * as apiURLs from "../apiURLs"

const useJournals = () => {
  const key = `${environment.API_URL}${apiURLs.JOURNAL}`
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
