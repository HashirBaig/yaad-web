import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getStreakByUser, createStreakByUser, breakStreakByUser, updateStreakByUser } from "../services/api"

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

export const createStreak = createAsyncThunk("streak/createStreak", async (data, thunkAPI) => {
  try {
    return await createStreakByUser(data)
  } catch (error) {
    const message = error?.message || error
    thunkAPI.rejectWithValue(message)
  }
})

export const breakStreak = createAsyncThunk("streak/breakStreak", async ({ userEmail }, thunkAPI) => {
  try {
    return await breakStreakByUser(userEmail)
  } catch (error) {
    const message = error?.message || error
    thunkAPI.rejectWithValue(message)
  }
})

export const updateStreak = createAsyncThunk("streak/updateStreak", async ({ id }, thunkAPI) => {
  try {
    return await updateStreakByUser(id)
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
    resetStreakState: state => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ""
    },
  },
  extraReducers: builder => {
    builder
      .addCase(updateStreak.pending, state => {
        state.isLoading = true
      })
      .addCase(updateStreak.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.streak = action.payload
      })
      .addCase(updateStreak.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.streak = {}
      })
      .addCase(breakStreak.pending, state => {
        state.isLoading = true
      })
      .addCase(breakStreak.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.streak = {}
      })
      .addCase(breakStreak.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.streak = {}
      })
      .addCase(createStreak.pending, state => {
        state.isLoading = true
      })
      .addCase(createStreak.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.streak = action.payload
      })
      .addCase(createStreak.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.streak = {}
      })
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

export const { setStreak, resetStreakState } = streakSlice.actions
export default streakSlice.reducer
