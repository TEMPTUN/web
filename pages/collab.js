import React, { useState } from 'react'
import Group from '../component/CollabPage/Group';
import Footer from '../component/FooterComp/Footer';
import style from '../styles/collab.module.scss';
import Discussion from '../component/CollabPage/Discussion';

const collab = () => {
  const[open,setOpen] = useState("Group"); 
  return (
   
      <div className={style.collabFrame}>
        <div className={style.collabHeader}>
          <span style={{color:open==="Group"?"red":"white"}} onClick={()=>setOpen("Group")}>Groups</span>
          <span style={{color:open==="Discuss"?"red":"white"}}  onClick={()=>setOpen("Discuss")}>Discussion</span>
        </div>

        <div className={style.options}>
          <span>Sort</span>
          <span>Filter</span>
          <img src={'images/search.png'}></img>
        </div>
        <div className={style.optionBox}>
          {open==="Group" &&<Group/>}
          {open==="Discuss" &&<Discussion/>}
        </div>
         
        <Footer/>
      </div>
      
   
    
  )
}

export default collab