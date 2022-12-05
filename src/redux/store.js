import { configureStore } from "@reduxjs/toolkit"

import authReducer from "./features/auth/authSlice"
import journalReducer from "./features/journal/journalSlice"
import streakReducer from "./features/streak/streakSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    journal: journalReducer,
    streak: streakReducer,
  },
})

export default store
