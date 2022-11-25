import axios from "axios"
import * as apiURLs from "./apiURLs"
import environment from "../config/environment"
// import setAuthToken from "./setAuthToken"

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
  if (localStorage.token) {
    config.headers["x-auth-token"] = localStorage.token
    // config.headers.common["x-auth-token"] = localStorage.token
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

export async function login(credentials) {
  try {
    const res = await userLogin(credentials)
    const token = res?.data?.token
    setAuthToken(token)
    return true
  } catch (error) {
    console.log(error)
  }
}
export async function userLogin(data) {
  return api.post(`${apiURLs.AUTH}`, data)
}

export async function logout() {
  setAuthToken(null)
}

export async function getCurrentUser() {
  return api.get(`${apiURLs.AUTH}`)
}

export async function loadUser() {
  await getCurrentUser()
  const token = localStorage.token
  setAuthToken(token)
  return { isAuth: true }
}

//--- JOURNAL ---//
export async function addJournal(data) {
  return api.post(`${apiURLs.JOURNAL}/add-entry`, data)
}

export async function getJournals() {
  return api.get(`${apiURLs.JOURNAL}`)
}

export async function softDeleteJournal({ id }) {
  return api.post(`${apiURLs.JOURNAL}/soft-delete/${id}`)
}

//--- USER ---//
export async function addUser(data) {
  return api.post(`${apiURLs.USER}/add-user`, data)
}
