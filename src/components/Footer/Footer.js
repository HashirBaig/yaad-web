import React from "react"
// import { useJournals } from "../../services/swrHooks"

function Footer() {
  // const { journals } = useJournals()
  // console.log("journals: ", journals)
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
