import React, { useState } from 'react'
import Group from '../component/CollabPage/Group';
import Footer from '../component/FooterComp/Footer';
import style from '../styles/collab.module.scss';
import Discussion from '../component/CollabPage/Discussion';

const collab = () => {
  const[open,setOpen] = useState("Group"); 
  return (
   
      <div className={style.collabFrame}>
        <div className={style.switchbutton}>
          <input className={style.switchbuttoncheckbox} onClick={()=>open==="Group"?setOpen("Discuss"):setOpen("Group")} type="checkbox"></input>
          <label className={style.switchbuttonlabel} for=""><span   className={style.switchbuttonlabelspan}>Groups</span></label>
        </div>
         
        <div className={style.optionBox}>
          {open==="Group" &&<Group/>}
          {open==="Discuss" &&<Discussion/>}
        </div>
         
        <Footer/>

        <styled jsx>{`
        
        
      `}</styled>
      </div>
   
    
  )
}

export default collab