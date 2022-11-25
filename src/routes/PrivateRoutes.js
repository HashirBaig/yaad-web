import React from "react"
import { Outlet, Navigate } from "react-router-dom"
import { AllRoutesMap } from "./RoutesConfig"
import { useSelector } from "react-redux"

function PrivateRoutes() {
  const isTokenAuthenticated = useSelector(state => state.auth.isTokenAuthenticated)

  return isTokenAuthenticated ? <Outlet /> : <Navigate to={AllRoutesMap.signIn} />
}

export default PrivateRoutes
