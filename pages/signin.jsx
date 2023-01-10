import axios from "axios";
import React,{ useState,useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';
import base_url from '../utils/connection'
import { useDispatch } from 'react-redux';
import {updateId} from '../redux_feature/UserInfo/userSlice'
import { useSelector } from "react-redux";


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
            alert(result.data.message);
          }
        } catch (error) {
          console.log("----------------------signinError--------------------------")
          console.log(error);
        }
      }

      useEffect(()=>{
        if(Userid!==null){
          router.push("/feed");
        }
      },[Userid])
    return (
        <>
            <h1>Sign In</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Email:
                    <input type="email" name="email" {...register("email",{required: true})}/>
                </label>
                <label>
                    Password:
                    <input type="password" name="password" {...register("password",{required: true,minLength: 6})}/>
                </label>
                <button type="submit">Sign In</button>
            </form>
        </>
    )
    };

export default signin;
