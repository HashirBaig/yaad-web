import { Fragment, useRef } from "react"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { Dialog, Transition } from "@headlessui/react"
import RequiredFieldMark from "../RequiredFieldMark"
import { XIcon } from "@heroicons/react/solid"
import { addUser } from "../../services/api"

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
})

export default function SignUpModal({ toggle, isOpen, setIsOpen }) {
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })
  const cancelButtonRef = useRef(null)

  const onSubmit = async formData => {
    try {
      await addUser(formData)
      reset()
      toggle()
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
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                  {/* MODAL HEADER */}
                  <div className="px-6 pt-4">
                    <div className="flex items-center justify-end">
                      <div className="close-btn" onClick={toggle}>
                        <XIcon className="h-4 w-4" />
                      </div>
                    </div>
                  </div>

                  {/* MODAL BODY */}
                  <div className="bg-white px-4 pb-4 sm:px-6 sm:pb-4">
                    {/* <div className="sm:flex sm:items-start"> */}
                    <div className="space-y-2">
                      <div className="form-group">
                        <label htmlFor="email" className="flex">
                          Username
                          <RequiredFieldMark />
                        </label>
                        <input type={"text"} placeholder={"e.g Sam Elliot"} {...register("username")} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email" className="flex">
                          Email
                          <RequiredFieldMark />
                        </label>
                        <input type={"email"} placeholder={"e.g abc@example.com"} {...register("email")} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password" className="flex">
                          Password
                          <RequiredFieldMark />
                        </label>
                        <input type={"password"} {...register("password")} />
                      </div>
                    </div>
                  </div>

                  {/* MODAL FOOTER */}
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Sign up
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
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
