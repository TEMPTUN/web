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
import styles from '../styles/signup.module.scss'


const signup = ()=> {
    const router = useRouter();
    const {register,handleSubmit,formState: { errors }} = useForm();
    const Userid = useSelector((state)=>state.user._id);
    const User = useSelector((state)=>state.user);
    const dispatch = useDispatch();
    const[ppic,setppic]=useState(false);

    const onSubmit = async(data) => {
      try {
        const res= await axios.post(`${base_url}/api/details/user`,data);
        localStorage.setItem("userId", res.data.id); 
        data._id=res.data.id; //adding over form data
        dispatch(CreateId(data));
        router.push("/categories");
      } catch (error) {
        console.log("------------SignupError-----------------------------");
        console.log(error);
      }
    }

    const isma=()=>{
      setppic((pre)=>!pre);
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
      user.friendId=[result.data.id];
      dispatch(CreateId(user));
  }

    useEffect(()=>{
      if(Userid!==null){
        router.push("/categories");
      }
    },[Userid])
    
  return (
    <div className={styles.box}>
        <h1>Sign up</h1>
       <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className={styles.innerbox}>
        
            {/* {ppic===true?<label htmlFor='fileUpload' onClick={()=>isma()}>Selected</label>:<label htmlFor='fileUpload' onClick={()=>isma()}>Select Profile Pic</label>}
            <input type="file" id="fileUpload" accept="image/*" hidden {...register("profilePic")}/> */}
            {/* {errors.name && errors.name.type === "required" && (
              <p className="errorMsg">Profile is required.</p>
            )} */}
       
           
            <input type="text" name="name" {...register("name",{required: true})} placeholder={"Name"}/>
            {errors.name && errors.name.type === "required" && (
              <p className="errorMsg">name is required.</p>
            )}
         
            <input type="email" name="email" {...register("email",{required: true,pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/})} placeholder={"Email"}/>
            {errors.email && errors.email.type === "required" && (
              <p className="errorMsg">Email is required.</p>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <p className="errorMsg">Email is not valid.</p>
            )}
          
      
            <input type="password" name="password" {...register("password",{required: true,minLength: 6})} placeholder={"Password"}/>
            {errors.password && errors.password.type === "required" && (
              <p className="errorMsg">password is required.</p>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <p className="errorMsg">Enter some lengthy password.</p>
            )}
          
       
          <button type='submit'>Hit n Run</button>
      </form>
      <div>
        {<GoogleLogin
          onSuccess={(res)=>CreateorGetUser(res)}
          onError={(res)=>console.log("google login error",res)}
        />}
      </div>
    </div>
  )
}

export default signup;

