import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../config/firebase"

// Get token from localStorage
// const token = localStorage.token

const intialState = {
  user: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
}

//--- LOGIN THUNK ---//
export const login = createAsyncThunk("auth/login", async ({ email, password }, thunkAPI) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    return res?.user
  } catch (error) {
    const message = error?.message || error
    thunkAPI.rejectWithValue(message)
  }
})

//--- LOGOUT THUNK ---//
export const logout = createAsyncThunk("auth/logout", async (data, thunkAPI) => {
  try {
    await signOut(auth)
  } catch (error) {
    const message = error?.message || error
    thunkAPI.rejectWithValue(message)
  }
})

//--- REGISTER/SIGN-UP THUNK ---//
export const registerUser = createAsyncThunk("auth/registerUser", async ({ email, password }, thunkAPI) => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password)
  } catch (error) {
    const message = error?.message || error
    thunkAPI.rejectWithValue(message)
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState: intialState,
  reducers: {
    reset: state => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ""
    },
    loadUser: (state, action) => {
      state.user = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, state => {
        state.user = null
      })
      .addCase(registerUser.pending, state => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
  },
})

export const { reset, loadUser } = authSlice.actions
export default authSlice.reducer
