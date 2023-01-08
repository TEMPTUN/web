import React from 'react'
import { useEffect } from 'react';
import {useDispatch } from 'react-redux';
import {updateId} from '../../redux_feature/UserInfo/userSlice' 

const first = () => {

    const dispatch = useDispatch();
    useEffect(()=>{
        const res = localStorage.getItem("userId");
        
        if(res!==null){
          dispatch(updateId(res));
        }
      },[])
  return (<></>)
}

export default first