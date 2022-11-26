import React, { useEffect } from "react"
import { Outlet, Navigate, useNavigate } from "react-router-dom"
import { AllRoutesMap } from "./RoutesConfig"
import { useSelector, useDispatch } from "react-redux"
import { authenticate } from "../redux/features/auth/authSlice"
import { getCurrentUser, setAuthToken } from "../services/api"

function PrivateRoutes() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.auth.isAuth)

  const checkForToken = async () => {
    //Check for token
    try {
      const token = localStorage.token
      await getCurrentUser()
      setAuthToken(token)
      dispatch(authenticate({ isAuth: true }))
      navigate(AllRoutesMap.home)
    } catch (error) {
      console.log(error)
      // Redirect back to sign-in page
      dispatch(authenticate({ isAuth: false }))
      navigate(AllRoutesMap.signIn)
    }
  }

  useEffect(() => {
    checkForToken()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isAuth ? (
    <Outlet />
  ) : !isAuth && localStorage.token ? ( // Refactor: Not sure if token has expired
    <div className="w-full min-h-screen flex items-center justify-center">
      <img className="h-20 w-20 border rounded-xl animate-pulse" src="/assets/images/yaad-logo.png" alt="Yaad Logo" />
    </div>
  ) : (
    <Navigate to={AllRoutesMap.signIn} />
  )
}

export default PrivateRoutes
