import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { createJournal, reset } from "../../redux/features/journal/journalSlice"

function Footer() {
  const [value, setValue] = useState("")
  const dispatch = useDispatch()

  const handleOnSubmit = async e => {
    e.preventDefault()
    try {
      const data = { message: value }
      dispatch(createJournal(data))
      dispatch(reset())
      setValue("")
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
