import React from 'react'
import style from './profile.module.scss'
import {useSelector} from 'react-redux';
import { useRouter } from 'next/router';

const UserProfile = () => {

    const router = useRouter();
    const user = useSelector((state)=>state.user);
    // console.log(user)
    const handleLogout = ()=>{
        localStorage.removeItem("userId");
        router.push("/signin");
    }
    
  return (
    <div className={style.frame}>
        <div className={style.upperCont}>
            <div className={style.my_info}> 
                <div className={style.img}>
                    <img src={user.image}></img>
                </div>
                <div className={style.name}>{user.name}</div>
                <div className={style.email}>{user.email}</div>
                <div className={style.bio}>{user.bio}</div>
            </div>
            <div className={style.follower}>
                <div className={style.stats}>
                    <div className={style.section}>
                        <div>
                            <span>Posts</span>
                            <br></br>
                            <span>20</span>
                        </div>
                    </div>
                    <div className={style.section}>
                        <div>
                            <span>Followers</span>
                            <br></br>
                            <span>18</span>
                        </div>
                    </div>
                    <div className={style.section}>
                         <button onClick={(e)=>handleLogout(e)}>logout</button>
                    </div>
                </div>
            </div>
        </div>
        <div className={style.LowerCont}>

        </div>
    </div>
  )
}

export default UserProfile