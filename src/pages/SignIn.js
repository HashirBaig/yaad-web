import React, { useState } from "react"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import { login } from "../services/api"
import { Spinner } from "../components/Loaders"
import { AllRoutesMap } from "../routes/RoutesConfig"
import { authenticate } from "../redux/features/auth/authSlice"

const schema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
})

function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async formData => {
    try {
      setIsLoading(true)
      const credentials = { ...formData }
      await login(credentials)
      dispatch(authenticate({ isAuth: true }))
      navigate(AllRoutesMap.home)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[25rem] border px-4 py-3 rounded-lg">
        <form className="space-y-5" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="abc@example.com" {...register("email")} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Password</label>
            <input type="password" {...register("password")} />
          </div>
          <button className="btn-form" type="submit">
            Sign In
            {isLoading && <Spinner size={"sm"} color={"light"} />}
          </button>
        </form>
        <div className="mt-20">
          <p className="text-sm text-gray-500 text-center">Don't have an account? "Sign Up" here</p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
