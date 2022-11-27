import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./features/auth/authSlice"
import journalReducer from "./features/journal/journalSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    journal: journalReducer,
  },
})

export default store
