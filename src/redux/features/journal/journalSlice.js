import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "../services/api"

const intialState = {
  journals: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
}

//--- GET JOURNALS THUNK ---//
export const getAllJournalsByUser = createAsyncThunk("journal/getAllJournalsByUser", async (data, thunkAPI) => {
  try {
    return await authService.getAllJournalsByUser()
  } catch (error) {
    const message = error?.message || error
    thunkAPI.rejectWithValue(message)
  }
})

//--- CREATE NEW JOURNAL THUNK ---//
export const createJournal = createAsyncThunk("journal/addJournal", async (data, thunkAPI) => {
  try {
    return await authService.addJournal(data)
  } catch (error) {
    const message = error?.message || error
    thunkAPI.rejectWithValue(message)
  }
})

//--- SOFT DELETE JOURNAL THUNK ---//
export const softDeleteJournal = createAsyncThunk("journal/softDeleteJournal", async (data, thunkAPI) => {
  try {
    return await authService.softDeleteJournal(data)
  } catch (error) {
    const message = error?.message || error
    thunkAPI.rejectWithValue(message)
  }
})

const journalSlice = createSlice({
  name: "journal",
  initialState: intialState,
  reducers: {
    reset: state => {
      state.journals = []
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ""
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllJournalsByUser.pending, state => {
        state.isLoading = true
      })
      .addCase(getAllJournalsByUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.journals = action.payload?.data?.journals
      })
      .addCase(getAllJournalsByUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.journals = []
      })
      .addCase(createJournal.pending, state => {
        state.isLoading = true
      })
      .addCase(createJournal.fulfilled, (state, action) => {
        const journal = action?.payload?.data?.journal
        state.isLoading = false
        state.isSuccess = true
        state.journals = [journal]
      })
      .addCase(createJournal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.journals = []
      })
      .addCase(softDeleteJournal.pending, state => {
        state.isLoading = true
      })
      .addCase(softDeleteJournal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.journals = []
      })
      .addCase(softDeleteJournal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.journals = []
      })
  },
})

export const { reset } = journalSlice.actions
export default journalSlice.reducer
