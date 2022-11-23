import React, { useState } from "react"
import axios from "axios"
// import { useJournals } from "../../services/swrHooks"

function Footer() {
  // const { journals } = useJournals()
  // console.log("journals: ", journals)
  const [value, setValue] = useState("")

  const resetForm = () => setValue("")

  const handleOnSubmit = async e => {
    e.preventDefault()
    try {
      const data = { message: value }
      resetForm()
      const res = await axios.post("http://localhost:5000/api/journal/add-entry", data)
      console.log("message sent >>> ", res?.data?.journal)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <footer className="sticky bottom-0">
      <form onSubmit={handleOnSubmit}>
        <input type="text" value={value} onChange={e => setValue(e.target.value)} />
        <button className="btn hidden sm:block" type="submit" disabled={!value}>
          Send
        </button>
      </form>
    </footer>
  )
}

export default Footer
