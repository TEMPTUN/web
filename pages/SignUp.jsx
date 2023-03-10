import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
const base_url = process.env.NEXT_PUBLIC_URL;
import { useRouter } from 'next/router'
import {useSelector,useDispatch } from 'react-redux';
import {CreateId} from '../redux_feature/UserInfo/userSlice' 
import { useEffect } from 'react';
import {convertToBase64} from '../utils/base64'
import jwtDecode from "jwt-decode"
import { GoogleLogin,googleLogout } from '@react-oauth/google';
import styles from '../styles/signup.module.scss'
import { DotLoader } from 'react-spinners';
import SignupP from '../component/Intial/SignupP';


const Signup = ()=> {
  
  return (
    <>
        <SignupP/>
    </>
  )
}

export default Signup;

