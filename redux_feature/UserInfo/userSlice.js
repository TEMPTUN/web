import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  _id:null,
  name:null,
  email:null,
  bio:null,
  categoryId:null,
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
      CreateId:(state,action)=>{
        return action.payload;
      },
      updateCategory:(state,action)=>{
        return{
          ...state,
          categoryId:action.payload,
        }
      }
  },
})

// Action creators are generated for each case reducer function
export const {CreateId,updateCategory} = UserSlice.actions

export default UserSlice.reducer