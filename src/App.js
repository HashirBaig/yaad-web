import React from "react"

import Header from "./components/Header"
import Main from "./components/Main"
import JournalList from "./components/JournalList"
import Footer from "./components/Footer"

// import { Spinner } from "./components/Loaders"
// import { loadUser } from "./services/api"

function App() {
  // const checkForToken = async () => {
  //   try {
  //     setIsLoading(true)
  //     const { isAuth } = await loadUser()
  //     if (isAuth) {
  //       setIsOpenSignInModal(!isAuth)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  // useEffect(() => {
  //   checkForToken()
  // }, [])

  return (
    <div className="min-h-screen">
      <Header />
      <Main>
        <JournalList />
      </Main>
      <Footer />
    </div>
  )
}

export default App
