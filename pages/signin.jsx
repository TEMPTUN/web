import axios from "axios";
import React,{ useState,useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';
import base_url from '../utils/connection'
import { useDispatch } from 'react-redux';
import {CreateId} from '../redux_feature/UserInfo/userSlice'
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode"
import styles from "../styles/signin.module.scss"
import { GoogleLogin,googleLogout } from '@react-oauth/google';


const signin = () => {
    const router = useRouter();
    const {register,handleSubmit,formState: { errors }} = useForm();
    const Userid = useSelector((state)=>state.user._id);
    const dispatch = useDispatch();

    const onSubmit = async(data) => {
        try {
          const result = await axios.get(`${base_url}/api/auth/isuser?email=${data.email}&password=${data.password}`)
          if(result.data.success===true){
            localStorage.setItem("userId", result.data.id);
            const res = await axios.get(`${base_url}/api/details/user?id=${result.data.id}`);
            dispatch(CreateId(res.data.result));
            router.push("/feed");
          }else{
            console.log(result.data.message);
          }
        } catch (error) {
          console.log("----------------------signinError--------------------------")
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
          router.push("/feed");
        }
      },[Userid])

    return (
        <div className={styles.frame}>
           <h1>Sign In</h1>
           <div className={styles.box}>
              <div className={styles.innerbox}>
                <span>We'r are Open</span>
                <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="email" name="email" {...register("email",{required: true})} placeholder=" Email:" className={styles.input}/>
                        <input type="password" name="password" {...register("password",{required: true,minLength: 6})} placeholder="Password" className={styles.input}/>
                    <button type="submit">Sign In</button>
                </form>
              </div>
              <span>OR</span>
              <div>
              {<GoogleLogin
                  onSuccess={(res)=>CreateorGetUser(res)}
                  onError={(res)=>console.log("google login error",res)}
                />}
              </div>
           </div>
           
          
        </div>
      )
    };

export default signin;





