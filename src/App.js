import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { SignIn, Home } from "./pages"
import { AllRoutesMap } from "./routes/RoutesConfig"
import PrivateRoutes from "./routes/PrivateRoutes"

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path={AllRoutesMap.home} element={<Home />} exact />
        </Route>
        <Route path={AllRoutesMap.signIn} element={<SignIn />} exact />
      </Routes>
    </Router>
  )
}

export default App
