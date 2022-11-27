import React, { useState } from "react"

function Footer() {
  const [value, setValue] = useState("")

  const handleOnSubmit = async e => {
    e.preventDefault()
    try {
      console.log("add journal")
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
