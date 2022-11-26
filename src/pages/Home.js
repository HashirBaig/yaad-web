import React from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import JournalList from "../components/JournalList"
import Main from "../components/Main"

function Home() {
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

export default Home
