import { createSlice } from "@reduxjs/toolkit"

const intialState = {
  isAuth: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState: intialState,
  reducers: {
    authenticate: (state, action) => {
      const { isAuth } = action.payload
      state.isAuth = isAuth
    },
  },
})

export const { authenticate } = authSlice.actions
export default authSlice.reducer
