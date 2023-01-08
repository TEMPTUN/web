import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import base_url from '../utils/connection'
import { useRouter } from 'next/router'
import {useSelector,useDispatch } from 'react-redux';
import {updateId} from '../redux_feature/UserInfo/userSlice' 
import { useEffect } from 'react';

const signup = ()=> {
    const router = useRouter();
    const {register,handleSubmit,formState: { errors }} = useForm();

    const Userid = useSelector((state)=>state.user.userId);
    const dispatch = useDispatch();
    const onSubmit = async(data) => {
      try {
        const res = await axios.get(`${base_url}/api/details/user?name=${data.name}&email=${data.email}&password=${data.password}`);
        localStorage.setItem("userId", res.data.id);  
        dispatch(updateId(res.data.id));
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(()=>{
      if(Userid!==null){
        router.push("/categories");
      }
    },[Userid])
  return (
    <div>
        
       <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name:
          <input type="text" name="name" {...register("name",{required: true})} />
          {errors.name && errors.name.type === "required" && (
            <p className="errorMsg">name is required.</p>
          )}
        </label>
        <label>
          email:
          <input type="email" name="email" {...register("email",{required: true,pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/})}/>
          {errors.email && errors.email.type === "required" && (
            <p className="errorMsg">Email is required.</p>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <p className="errorMsg">Email is not valid.</p>
          )}
        </label>
        <label>
          password:
          <input type="password" name="password" {...register("password",{required: true,minLength: 6})} />
          {errors.password && errors.password.type === "required" && (
            <p className="errorMsg">password is required.</p>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <p className="errorMsg">Enter some lengthy password.</p>
          )}
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default signup