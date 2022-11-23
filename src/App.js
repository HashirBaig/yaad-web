import React from "react"

import Header from "./components/Header"
import Main from "./components/Main"
import Footer from "./components/Footer"

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Main>
        <p>Message</p>
        <p>Message</p>
        <p>Message</p>
        <p>Message</p>
        <p>Message</p>
      </Main>
      <Footer />
    </div>
  )
}

export default App
