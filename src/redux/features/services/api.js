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

api.interceptors.request.use(config => {
  const token = `${localStorage.token}`
  if (token) {
    config.headers["x-auth-token"] = token
  }

  return config
})

/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
**/

api.interceptors.response.use(
  res => res,
  err => {
    if (err.message.includes(401)) {
      console.log("auth token expired")
      logout()
    }
    return Promise.reject(err)
  }
)

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
export async function addJournal(data) {
  return api.post(`${apiURLs.JOURNAL}/add-entry`, data)
}

export async function getAllJournalsByUser(token) {
  return api.get(`${apiURLs.JOURNAL}`)
}

export async function updateJournal(params) {
  const { id, ...data } = params
  return api.put(`${apiURLs.JOURNAL}/update-journal/${id}`, data)
}

export async function softDeleteJournal(id) {
  return api.post(`${apiURLs.JOURNAL}/soft-delete/${id}`)
}

//--- USER ---//
async function addUser(data) {
  return api.post(`${apiURLs.USER}/add-user`, data)
}

//--- STREAK ---//
export async function getStreakByUser() {
  return api.get(`${apiURLs.STREAK}`)
}

const authService = {
  logout,
  login,
  userLogin,
  loadUser,
  addJournal,
  getAllJournalsByUser,
  softDeleteJournal,
  addUser,
  setAuthToken,
}

export default authService
