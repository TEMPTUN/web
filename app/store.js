import { configureStore } from '@reduxjs/toolkit'
import UserReducer from '../redux_feature/UserInfo/userSlice'

// enableMapSet();
export const store = configureStore({
  reducer: {
    user: UserReducer,
  },
})