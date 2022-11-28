import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import Header from "../components/Header"
import Main from "../components/Main"
import Journal from "../components/Journal"

import { AllRoutesMap } from "../routes/RoutesConfig"
import { logout } from "../redux/features/auth/authSlice"

function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    // If user log's out in one tab, he/she is logged out of all the other tabs as well
    window.addEventListener("storage", () => {
      if (!localStorage.token) {
        dispatch(logout())
        navigate(AllRoutesMap.signIn)
      }
    })

    // eslint-disable-next-line
  }, [])

  return (
    <div className="min-h-screen">
      <Header />
      <Main>
        <Journal />
      </Main>
    </div>
  )
}

export default Home
