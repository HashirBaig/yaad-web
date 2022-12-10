import { useEffect } from "react"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { login, reset } from "../redux/features/auth/authSlice"
import { AllRoutesMap } from "../routes/RoutesConfig"
import { Spinner } from "../components/Loaders"
import RequiredFieldMark from "../components/RequiredFieldMark"

const schema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
})

function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth)

  useEffect(() => {
    if (isError) {
      console.log("error: ", message)
    }

    if (isSuccess && user) {
      navigate(AllRoutesMap.home)
    }

    dispatch(reset())
  }, [user, isError, message, isSuccess, navigate, dispatch])

  const onSubmit = formData => {
    try {
      dispatch(login(formData))
    } catch (error) {
      console.log(error)
    }
  }

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[25rem] border border-slate-600 px-4 py-3 rounded-lg">
        <form className="space-y-5" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="email">
              Email
              <RequiredFieldMark />
            </label>
            <input type="email" placeholder="abc@example.com" {...register("email")} />
          </div>
          <div className="form-group">
            <label htmlFor="email">
              Password
              <RequiredFieldMark />
            </label>
            <input type="password" {...register("password")} />
          </div>
          <button className="btn-form" type="submit">
            Sign In
            {isLoading && <Spinner size={"sm"} />}
          </button>
        </form>
        <div className="mt-20">
          <p className="text-sm text-gray-500 text-center">
            Don't have an account?{" "}
            <Link className="btn-link" to={AllRoutesMap.signUp}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
