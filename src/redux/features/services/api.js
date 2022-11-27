import axios from "axios"
import * as apiURLs from "./apiURLs"
import environment from "../../../config/environment"

const baseConfig = {
  baseURL: `${environment.API_URL}`,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
}

//Basic configuration for HTTP calls
const api = axios.create(baseConfig)

//--- AUTH ---//
function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["x-auth-token"] = token
    localStorage.setItem("token", token)
  } else {
    delete api.defaults.headers.common["x-auth-token"]
    localStorage.removeItem("token")
  }
}

async function login(credentials) {
  try {
    const res = await userLogin(credentials)
    const token = res?.data?.token
    setAuthToken(token)
    return token
  } catch (error) {
    console.log(error)
  }
}
async function userLogin(data) {
  return api.post(`${apiURLs.AUTH}`, data)
}

async function logout() {
  setAuthToken(null)
}

async function getCurrentUser() {
  return api.get(`${apiURLs.AUTH}`)
}

async function loadUser({ token }) {
  const res = await getCurrentUser()
  setAuthToken(token)
  return res
}

//--- JOURNAL ---//
async function addJournal(data) {
  return api.post(`${apiURLs.JOURNAL}/add-entry`, data)
}

async function getJournals() {
  return api.get(`${apiURLs.JOURNAL}`)
}

async function softDeleteJournal({ id }) {
  return api.post(`${apiURLs.JOURNAL}/soft-delete/${id}`)
}

//--- USER ---//
async function addUser(data) {
  return api.post(`${apiURLs.USER}/add-user`, data)
}

const authService = {
  logout,
  login,
  userLogin,
  loadUser,
  addJournal,
  getJournals,
  softDeleteJournal,
  addUser,
}

export default authService
