import React, { useState } from "react"
import { useSelector } from "react-redux"
import { LogoutModal } from "../Modals"
import { LogoutIcon } from "@heroicons/react/outline"
import { FireIcon } from "@heroicons/react/solid"

function Header() {
  const [isOpenSignUModal, setIsOpenSignUModal] = useState(false)
  const { streak } = useSelector(state => state.streak)

  const toggleSignUpModal = () => setIsOpenSignUModal(!isOpenSignUModal)

  return (
    <>
      <header className="sticky top-0 z-50 px-4 py-2 shadow-md bg-slate-900">
        <div className="flex items-center justify-between">
          <img className="h-12 w-12 rounded-md opacity-90" src="/assets/images/yaad-logo.png" alt="Yaad Logo" />
          <div className="hover:bg-slate-700 transition duration-150 ease-out flex items-center rounded-full p-1">
            <FireIcon className="h-5 w-5 text-amber-500" />
            <span className="text-lg font-semibold text-gray-500">{streak}</span>
          </div>
          <div className="flex space-x-2">
            <div onClick={toggleSignUpModal} title={"Logout"}>
              <LogoutIcon className="h-9 w-9 text-red-400 hover:text-red-500 cursor-pointer" />
            </div>
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
