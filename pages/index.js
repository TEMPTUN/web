import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import base_url from '../utils/connection'
import { useRouter } from 'next/router'
import {useSelector,useDispatch } from 'react-redux';
import {updateId} from '../redux_feature/UserInfo/userSlice' 
import { useEffect } from 'react';

const Home = ()=> {
  return (
    <h2>CollabIn</h2>
  )
}
export default Home