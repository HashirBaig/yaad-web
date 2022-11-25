import React, { useState } from "react"
import { SignInModal } from "../components/Modals"

function SignIn() {
  const [isOpenSignInModal, setIsOpenSignInModal] = useState(true)

  const toggleSignUpModal = () => setIsOpenSignInModal(!isOpenSignInModal)

  return (
    <div>
      <SignInModal toggle={toggleSignUpModal} isOpen={isOpenSignInModal} setIsOpen={setIsOpenSignInModal} />
    </div>
  )
}

export default SignIn
