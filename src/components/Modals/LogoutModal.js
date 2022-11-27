import { Fragment, useRef } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { ExclamationCircleIcon } from "@heroicons/react/outline"
import { useDispatch } from "react-redux"
import { logout, reset } from "../../redux/features/auth/authSlice"
import { useNavigate } from "react-router-dom"
import { AllRoutesMap } from "../../routes/RoutesConfig"

export default function LogoutModal({ toggle, isOpen, setIsOpen }) {
  const cancelButtonRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleOnClick = () => {
    try {
      dispatch(logout())
      dispatch(reset())
      navigate(AllRoutesMap.signIn)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                {/* MODAL BODY */}
                <div className="bg-white px-4 pb-4 sm:px-6 sm:pb-4">
                  <div className="flex py-7 space-x-2">
                    <ExclamationCircleIcon className="h-6 w-6 text-yellow-500" />
                    <p>Do you want to logout?</p>
                  </div>
                </div>

                {/* MODAL FOOTER */}
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleOnClick}
                  >
                    Logout
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={toggle}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
