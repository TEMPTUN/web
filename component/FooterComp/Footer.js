import React from 'react'
import style from './footer.module.scss'
import { useRouter } from 'next/router'
const Footer = () => {
    const route = useRouter();
    const handleRoute = (path)=>{
        route.push(path);
    }
  return (
    <div  className={style.footer}>
        <img onClick={()=>handleRoute('/feed')} src={'/images/home.svg'}></img>
        <img onClick={()=>handleRoute('/explore')} src={'/images/explore.svg'}></img>
        <img onClick={()=>handleRoute('/collab')} src={'/images/group.svg'}></img>
        <img onClick={()=>handleRoute('/profile')} src={'/images/profile.svg'}></img>
    </div>
  )
}

export default Footer