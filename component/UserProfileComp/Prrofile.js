import React from 'react'
import style from './profile.module.scss'
import {useSelector} from 'react-redux';

const Prrofile = () => {

    const user = useSelector((state)=>state.user);
    // console.log(user)
  return (
    <div>
        <div className={style.upperCont}>
            <div className={style.my_info}> 
                <div className={style.img}>
                    {/* <img src={user.image}></img> */}
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
                </div>
            </div>
        </div>
        <div className={style.LowerCont}>

        </div>
    </div>
  )
}

export default Prrofile