import { configureStore } from '@reduxjs/toolkit'

import authReducer from './authSlice'
import counterReducer from './counterSlice'
import usersReducer from './usersSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    users: usersReducer,
  },
})
