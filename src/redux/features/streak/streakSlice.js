import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getStreakByUser } from "../services/api"

const intialState = {
  streak: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
}

export const getStreak = createAsyncThunk("streak/getStreak", async ({ userEmail }, thunkAPI) => {
  try {
    return await getStreakByUser(userEmail)
  } catch (error) {
    const message = error?.message || error
    thunkAPI.rejectWithValue(message)
  }
})

const streakSlice = createSlice({
  name: "streak",
  initialState: intialState,
  reducers: {
    setStreak: (state, action) => {
      state.streak = action.payload
    },
    reset: state => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ""
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getStreak.pending, state => {
        state.isLoading = true
      })
      .addCase(getStreak.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.streak = action.payload
      })
      .addCase(getStreak.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.streak = {}
      })
  },
})

export const { setStreak, reset } = streakSlice.actions
export default streakSlice.reducer
