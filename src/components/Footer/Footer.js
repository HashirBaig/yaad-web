import React, { useState } from "react"
import { addJournal } from "../../redux/features/services/api"

function Footer() {
  const [value, setValue] = useState("")

  const resetForm = () => setValue("")

  const handleOnSubmit = async e => {
    e.preventDefault()
    try {
      const data = { message: value }
      resetForm()
      await addJournal(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <footer className="sticky bottom-0">
      <form className="journal-entry-form" onSubmit={handleOnSubmit}>
        <input type="text" value={value} onChange={e => setValue(e.target.value)} />
        <button className="btn hidden sm:block" type="submit" disabled={!value}>
          Send
        </button>
      </form>
    </footer>
  )
}

export default Footer
