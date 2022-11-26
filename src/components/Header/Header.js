import React, { useState } from "react"
import { SignUpModal } from "../Modals"
import { UserCircleIcon } from "@heroicons/react/solid"

function Header() {
  const [isOpenSignUModal, setIsOpenSignUModal] = useState(false)
  const toggleSignUpModal = () => setIsOpenSignUModal(!isOpenSignUModal)

  return (
    <>
      <header className="sticky top-0 z-50 px-4 py-3 shadow-md bg-white">
        <div className="flex items-center justify-between">
          <img className="h-12 w-12" src="/assets/images/yaad-logo.png" alt="Yaad Logo" />

          <UserCircleIcon className="h-12 w-12 text-gray-500 cursor-pointer" onClick={toggleSignUpModal} />
        </div>
      </header>
      {isOpenSignUModal && (
        <SignUpModal toggle={toggleSignUpModal} isOpen={isOpenSignUModal} setIsOpen={setIsOpenSignUModal} />
      )}
    </>
  )
}

export default Header
