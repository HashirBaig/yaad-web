import React from "react"

import Header from "./components/Header"
import Main from "./components/Main"
import JournalList from "./components/JournalList"
import Footer from "./components/Footer"

function App() {
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
