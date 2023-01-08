import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  userId:null,
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateId:(state,action)=>{
        return{
            ...state,
            userId:action.payload,
        }
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement ,updateId} = UserSlice.actions

export default UserSlice.reducer