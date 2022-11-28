import React from "react"
import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"
import { AllRoutesMap } from "./RoutesConfig"

function PrivateRoutes() {
  const { user } = useSelector(state => state.auth)

  return user ? <Outlet /> : <Navigate to={AllRoutesMap.signIn} />
}

export default PrivateRoutes
