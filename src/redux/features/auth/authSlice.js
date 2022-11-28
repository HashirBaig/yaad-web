import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "../services/api"

// Get token from localStorage
const token = localStorage.token

const intialState = {
  user: token ? token : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
}

//--- LOGIN THUNK ---//
export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    return await authService.login(data)
  } catch (error) {
    const message = error?.message || error
    thunkAPI.rejectWithValue(message)
  }
})

//--- LOGOUT THUNK ---//
export const logout = createAsyncThunk("auth/logout", async (data, thunkAPI) => {
  try {
    return await authService.logout()
  } catch (error) {
    const message = error?.message || error
    thunkAPI.rejectWithValue(message)
  }
})

//--- REGISTER/SIGN-UP THUNK ---//
export const addUser = createAsyncThunk("auth/addUser", async (data, thunkAPI) => {
  try {
    return await authService.addUser(data)
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
      .addCase(addUser.pending, state => {
        state.isLoading = true
      })
      .addCase(addUser.fulfilled, (state, action) => {
        const token = action.payload?.data?.token
        authService.setAuthToken(token)

        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
