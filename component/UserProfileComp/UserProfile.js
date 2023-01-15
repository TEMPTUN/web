import React, { use, useState } from 'react'
import style from './profile.module.scss'
import {useDispatch, useSelector} from 'react-redux';
import { useRouter } from 'next/router';
import { reset } from '../../redux_feature/UserInfo/userSlice';

const UserProfile = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.user);
    const[openBar,setOpenBar] = useState(true);

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
            <div className={style.social}>
                <div className={style.section}>
                    <div>{user.PostId.length}</div>
                    <span>Posts</span>
                </div>
                <div className={style.section}>
                    <div>{90}</div>
                    <span>Follower</span>
                </div>
                <div className={style.section}>
                    <div>{user.friendId.length}</div>
                    <span>Following</span>
                </div>
                
            </div>
        </div>
        <div className={style.LowerCont}>
            <div className={style.postCont}>

            </div>
            <div className={style.postCont}>

            </div>
            <div className={style.postCont}>

            </div>
            <div className={style.postCont}>

            </div>
            <div className={style.postCont}>

            </div>
            <div className={style.postCont}>

            </div>
        </div>
    </div>
  )
}

export default UserProfile