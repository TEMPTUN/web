import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  _id:null,
  name:null,
  email:null,
  bio:null,
  likeId:[],
  categoryId:[],
  friendId:[],
  PostId:[],
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
      CreateId:(state,action)=>{
        return {
          ...state,
          _id: action.payload._id,
          name: action.payload.name,
          email: action.payload.email,
          categoryId:action.payload.categoryId,
          likeId:action.payload.LikeId,
          image:  action.payload.image,
          friendId: [...action.payload.friendId],
          PostId: action.payload.PostId,
        }
      },
      updateCategory:(state,action)=>{
        return{
          ...state,
          categoryId:action.payload,
        }
      },
      reset:(state,action)=>{
        return initialState;
      }
  },
})

// Action creators are generated for each case reducer function
export const {CreateId,updateCategory,reset} = UserSlice.actions

export default UserSlice.reducer