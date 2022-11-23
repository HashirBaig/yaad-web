import React from "react"

function Footer() {
  return (
    <footer className="sticky bottom-0">
      <form>
        <input type="text" />
        <button className="btn hidden sm:block" type="submit">
          Send
        </button>
      </form>
    </footer>
  )
}

export default Footer