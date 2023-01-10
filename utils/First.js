import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import {useDispatch } from 'react-redux';
import base_url from '../utils/connection'
import {CreateId} from '../redux_feature/UserInfo/userSlice' 

const first = () => {

    const dispatch = useDispatch();
    useEffect(()=>{
        const id = localStorage.getItem("userId");
        if(id!==null){
          async function fetch(){
            const res = await axios.get(`${base_url}/api/details/user?id=${id}`);
            dispatch(CreateId(res.data.result));
          }          
          fetch();
        }
      },[])
  return (<></>)
}

export default first