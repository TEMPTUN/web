import React, { useState } from 'react'
import style from './profile.module.scss'
import {useDispatch, useSelector} from 'react-redux';
import { useRouter } from 'next/router';
import { reset } from '../../redux_feature/UserInfo/userSlice';
import { useEffect } from 'react';
import { base_url } from '../../utils/connection';
import Posts from '../FeedComp/Post';
import axios from 'axios';
import Link from 'next/link';


const UserProfile = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.user);
    const[openBar,setOpenBar] = useState(false);
    const[content,setContent] = useState("about");
    const[posts,setPosts] = useState([]);

    const handleLogout = ()=>{
        localStorage.removeItem("userId");
        dispatch(reset());
        router.push("/signin");
    }
    
  return (
    <div className={style.frame}>
        <div className={style.upperCont}>
           <div className={style.userHeader}> 
                <span>{user.name}</span>
                <img onClick={()=>setOpenBar(!openBar)}src='/images/humburger.svg' style={{cursor:"pointer"}}></img>
                {openBar===true && 
                    <div className={style.logout}>
                        <button onClick={()=>handleLogout()}>logout</button>
                    </div>
                }
           </div>
           <div className={style.about}>
                {user.image!==null? <img src={user.image}></img>:<img src={'/images/user.svg'}></img> }
                <div><p>{user.bio}loreum ipsum mpifj ofohufui  uofhsflkfjr lefrrgio irefh ileuos loifh oiodfsh</p></div>
           </div>
            <Link href="/userprofile">my profile</Link>
        </div>
    </div>
  )
}

export default UserProfile