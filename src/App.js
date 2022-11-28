import { useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import { SignIn, Home, SignUp } from "./pages"
import { AllRoutesMap } from "./routes/RoutesConfig"
import PrivateRoutes from "./routes/PrivateRoutes"
import { useSelector } from "react-redux"

function App() {
  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth)
  useEffect(() => {
    if (!user) {
      navigate(AllRoutesMap.signIn)
    }

    // eslint-disable-next-line
  }, [])

  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path={AllRoutesMap.home} element={<Home />} exact />
      </Route>
      <Route path={AllRoutesMap.signIn} element={<SignIn />} exact />
      <Route path={AllRoutesMap.signUp} element={<SignUp />} exact />
    </Routes>
  )
}

export default App
