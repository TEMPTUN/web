import axios from "axios";
import React from "react";
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';
import base_url from '../utils/connection'

const signin = async() => {
    const router = useRouter();
    const {register,handleSubmit,formState: { errors }} = useForm();
    const onSubmit = async(data) => {
        try {
          const result = await axios.get(`${base_url}/api/auth/isuser?email=${data.email}&password=${data.password}`)
          localStorage.setItem("userId", result.data.id);
          router.push("/feed");
        } catch (error) {
          console.log(error);
        }
      }

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
