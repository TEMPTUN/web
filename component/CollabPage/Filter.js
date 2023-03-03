import React from 'react'
import { useState } from 'react'
import style from './style.module.scss'

const Filter = ({opt,setMyWork}) => {
  const [search,openSearch] = useState(false);
  return (
    <div className={style.filterCont}>
        <div className={style.filterOne}>
            {search===false && <p>{opt==="group"?"Oppurtunities for you":"Let Discuss"}</p>}
            {search===true && <p>{opt==="group"?"Oppurtunities for you":"Let Discuss"}</p>}
            <img onClick={()=>openSearch(!search)} src={'/images/search.png'}></img>
        </div>
        <div className={style.filterTwo}>
            <p onClick={()=>setMyWork(false)}>explore</p>
            <p onClick={()=>setMyWork(true)}>{opt==="group"?"My Groups":"My Discussion"}</p>
            <p>Filter</p>
        </div>     
    </div>
  )
}

export default Filter