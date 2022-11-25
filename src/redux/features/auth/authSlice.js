import { createSlice } from "@reduxjs/toolkit"

const intialState = {
  isTokenAuthenticated: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState: intialState,
  reducers: {
    authenticate: (state, action) => {
      const { isTokenAuthenticated } = action.payload
      state.isTokenAuthenticated = isTokenAuthenticated
    },
  },
})

export const { authenticate } = authSlice.actions
export default authSlice.reducer
