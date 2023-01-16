import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import base_url from '../utils/connection'
import { useRouter } from 'next/router'
import {useSelector,useDispatch } from 'react-redux';
import {CreateId} from '../redux_feature/UserInfo/userSlice' 
import { useEffect } from 'react';
import {convertToBase64} from '../utils/base64'
import jwtDecode from "jwt-decode"
import { GoogleLogin,googleLogout } from '@react-oauth/google';


const signup = ()=> {
    const router = useRouter();
    const {register,handleSubmit,formState: { errors }} = useForm();
    const Userid = useSelector((state)=>state.user._id);
    const User = useSelector((state)=>state.user);
    const dispatch = useDispatch();

    const onSubmit = async(data) => {
      const base64 = await convertToBase64(data.profilePic[0]);
      data.profilePic = base64;
      try {
        const res= await axios.post(`${base_url}/api/details/user`,data);
        localStorage.setItem("userId", res.data.id); 
        data._id=res.data.id; //adding over form data
        dispatch(CreateId(data));
      } catch (error) {
        console.log("------------SignupError-----------------------------");
        console.log(error);
      }
    }

    const CreateorGetUser = async (res) => {
      const decode=jwtDecode(res.credential);
      const { name, email, picture } = decode;
      const user = {
          name:name,
          email:email,
          image:picture
      }
      const result=await axios.post(`${base_url}/api/auth/gauth`,user);
      localStorage.setItem("userId", result.data.id); 
      user._id=result.data.id;
      dispatch(CreateId(user));
  }

    useEffect(()=>{
      if(Userid!==null){
        router.push("/categories");
      }
    },[Userid])
    
  return (
    <div>
        
       <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div>
            <label htmlFor='fileUpload' style={{backgroundColor:"pink"}}> Select Profile</label>
            <input type="file" id="fileUpload" accept="image/*" hidden {...register("profilePic",{required: true})}/>
            {errors.name && errors.name.type === "required" && (
              <p className="errorMsg">Profile is required.</p>
            )}
        </div>
        <div>
          <label>
            Name:
            <input type="text" name="name" {...register("name",{required: true})} />
            {errors.name && errors.name.type === "required" && (
              <p className="errorMsg">name is required.</p>
            )}
          </label>
        </div>
        <div>
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
        </div>
        <div>
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
        </div>
       
        <input type="submit" value="Submit" />
      </form>
      {<GoogleLogin
        onSuccess={(res)=>CreateorGetUser(res)}
        onError={(res)=>console.log("google login error",res)}
      />}
      <button onClick={()=>{googleLogout()}}>logout</button> 
    </div>
  )
}

export default signup;

