import axios from "axios"
import * as apiURLs from "./apiURLs"
import environment from "../config/environment"

const baseConfig = {
  baseURL: `${environment.API_URL}`,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
}

//Basic configuration for HTTP calls
const api = axios.create(baseConfig)

export async function addJournal(data) {
  return api.post(`${apiURLs.JOURNAL}/add-entry`, data)
}

export async function getJournals() {
  return api.get(`${apiURLs.JOURNAL}`)
}

export async function softDeleteJournal({ id }) {
  return api.post(`${apiURLs.JOURNAL}/soft-delete/${id}`)
}
