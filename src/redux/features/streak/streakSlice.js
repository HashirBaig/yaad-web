import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../services/api"

const intialState = {
  streak: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
}

//--- GET ACTIVE STREAK BY USER THUNK ---//
export const getStreakByUser = createAsyncThunk("streak/getStreakByUser", async (data, thunkAPI) => {
  try {
    return await api.getStreakByUser(data)
  } catch (error) {
    const message = error?.message || error
    thunkAPI.rejectWithValue(message)
  }
})

//--- CREATE STREAK BY USER THUNK ---//
export const createStreakByUser = createAsyncThunk("streak/createStreakByUser", async (data, thunkAPI) => {
  try {
    return await api.createStreakByUser(data)
  } catch (error) {
    const message = error?.message || error
    thunkAPI.rejectWithValue(message)
  }
})

const streakSlice = createSlice({
  name: "streak",
  initialState: intialState,
  reducers: {
    reset: state => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ""
    },
    setStreak: (state, action) => {
      state.streak = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getStreakByUser.pending, state => {
        state.isLoading = true
      })
      .addCase(getStreakByUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.streak = action.payload
      })
      .addCase(getStreakByUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createStreakByUser.pending, state => {
        state.isLoading = true
      })
      .addCase(createStreakByUser.fulfilled, (state, action) => {
        console.log("createStreakByUser: ", action.payload)
        state.isLoading = false
        state.isSuccess = true
        // state.streak = action.payload
      })
      .addCase(createStreakByUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { setStreak, reset } = streakSlice.actions
export default streakSlice.reducer
