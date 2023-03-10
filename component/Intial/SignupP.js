import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
const base_url = process.env.NEXT_PUBLIC_URL;
import { useRouter } from 'next/router'
import {useSelector,useDispatch } from 'react-redux';
import {CreateId} from '../../redux_feature/UserInfo/userSlice' 
import { useEffect } from 'react';
import {convertToBase64} from '../../utils/base64'
import jwtDecode from "jwt-decode"
import { GoogleLogin,googleLogout } from '@react-oauth/google';
import styles from '../../styles/signup.module.scss'
import { DotLoader } from 'react-spinners';


const SignupP = ()=> {
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
        console.log(data._id);
        dispatch(CreateId(data));
        router.push("/categories");
      } catch (error) {
        console.log(error.message);
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
      }else{
        setTimeout(()=>{
          <DotLoader color="hsla(238, 67%, 53%, 1)" style={{display:"flex",justifyContent:"center",alignContent:"center"}} loading={true} size={25} />
        },5000)
      }
      
    },[Userid])

    const onClickFunc = ()=>{
      router.push("/signin");
    }
    
  return (
    <div className={styles.box}>

        <div className={styles.comp}>
          <p>CollabIn</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className={styles.innerbox}>
              <div className={styles.para}>
                <p style={{marginBottom:"10px",color:"#606060",fontSize:"20px"}}>Create your account</p>
              </div>
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
            
        
            <button type='submit'>Sign up</button>
        </form>

        <p className={styles.onsite}>Already a user?<span style={{marginLeft:"7px",fontSize:"15px",color:"blue",cursor:"pointer"}} onClick={()=>onClickFunc()}>SignIn</span></p>
      <div>
        {<GoogleLogin
          onSuccess={(res)=>CreateorGetUser(res)}
          onError={(res)=>console.log("google login error",res)}
        />}
      </div>
    </div>
  )
}

export default SignupP;

