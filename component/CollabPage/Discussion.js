import React from 'react'
import style from './style.module.scss';
import { useState } from 'react';
import CreateDiscussion from './CreateDiscussion';

const Discussion = () => {
    const [open,setOpen] = useState(false);
    const discuss = [
        {
            name:"chirag",
            image:"image",
            id:"ihfeidf",
            title:"kidjfofofg",
            description:"irehfierguierpgi",
            category:["CS","PS","GDS"],
            time:"2d ago"
        }
    ]
  return (
    <div className={style.groupFrame}> 
        <div className={style.createPost} onClick={()=>setOpen(true)}>Ask</div>
        {open===true && <CreateDiscussion setOpen={setOpen}/>}
        {discuss!==null && (
             <div style={{width:"95%"}}>{
                discuss.map((d,ind)=>(
                    <div className={style.groupBox} key={ind+'gp'}>
                        {console.log(d)}
                        <div className={style.head}>
                            <img src={d?.image}></img>
                            <div className={style.nameTitle}>
                                <h4>{d?.name}</h4>
                                <span>{d?.time}</span>
                            </div>
                            <h4 className={style.compensation}>{d?.Compensation}</h4>
                        </div>
                        <div className={style.body}>
                            <h2>{d?.title}</h2>
                            <p>{d?.description}</p>
                            <div>
                            {
                                d?.category.map((cat)=>(
                                    <span>{cat}</span>
                                ))
                            }
                            </div>     
                        </div>
                    </div>
                ))
            }
        </div>
        )}

    </div>
  )
}

export default Discussion