import { createSlice } from "@reduxjs/toolkit"

const intialState = {
  journals: [],
}

const authSlice = createSlice({
  name: "journal",
  initialState: intialState,
  reducers: {
    setJournals: (state, action) => {
      state.journals = action.payload
    },
  },
})

export const { setJournals } = authSlice.actions
export default authSlice.reducer
