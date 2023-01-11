import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import base_url from '../utils/connection'
import { useRouter } from 'next/router'
import {useSelector,useDispatch } from 'react-redux';
import {CreateId} from '../redux_feature/UserInfo/userSlice' 
import { useEffect } from 'react';
import {convertToBase64} from '../utils/imageTourl'

const signup = ()=> {
    const router = useRouter();
    const {register,handleSubmit,formState: { errors }} = useForm();
    const [image, setimage] = useState({ profilePic:"" });
    const Userid = useSelector((state)=>state.user._id);
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

    useEffect(()=>{
      if(Userid!==null){
        router.push("/categories");
      }
    },[Userid])
    
  return (
    <div>
        
       <form onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
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
    </div>
  )
}

export default signup;

