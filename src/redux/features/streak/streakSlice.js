import { createSlice } from "@reduxjs/toolkit"

const intialState = {
  streak: 0,
}

const streakSlice = createSlice({
  name: "streak",
  initialState: intialState,
  reducers: {
    setStreak: (state, action) => {
      state.streak = action.payload
    },
  },
})

export const { setStreak } = streakSlice.actions
export default streakSlice.reducer
