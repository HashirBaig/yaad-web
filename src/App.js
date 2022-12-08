import { useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import { SignIn, Home, SignUp } from "./pages"
import { AllRoutesMap } from "./routes/RoutesConfig"
import PrivateRoutes from "./routes/PrivateRoutes"
import { useDispatch, useSelector } from "react-redux"
import { onAuthStateChanged } from "firebase/auth"
import { loadUser } from "./redux/features/auth/authSlice"
import { auth } from "./config/firebase"

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      dispatch(loadUser(currentUser))
    })

    // eslint-disable-next-line
  }, [])

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
