import React, { useState } from "react"
import { LogoutModal } from "../Modals"
import { ArrowCircleRightIcon } from "@heroicons/react/outline"

function Header() {
  const [isOpenSignUModal, setIsOpenSignUModal] = useState(false)
  const toggleSignUpModal = () => setIsOpenSignUModal(!isOpenSignUModal)

  return (
    <>
      <header className="sticky top-0 z-50 px-4 py-3 shadow-md bg-white">
        <div className="flex items-center justify-between">
          <img className="h-12 w-12" src="/assets/images/yaad-logo.png" alt="Yaad Logo" />
          <div onClick={toggleSignUpModal} title={"Logout"}>
            <ArrowCircleRightIcon className="h-9 w-9 text-red-400 hover:text-red-500 cursor-pointer" />
          </div>
        </div>
      </header>
      {isOpenSignUModal && (
        <LogoutModal toggle={toggleSignUpModal} isOpen={isOpenSignUModal} setIsOpen={setIsOpenSignUModal} />
      )}
    </>
  )
}

export default Header
