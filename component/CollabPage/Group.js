 import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
 import CreateGroup from './CreateGroup'
 import style from './style.module.scss'

 const Group = () => {
    const [open,setOpen] = useState(false);
    const [groupId,setGroupId] = useState([]);
    // const user = useSelector((state)=>state.user);

    // useEffect(()=>{
    //     if(user._id!==null){
    //         async function getGroupIds(){
    //             let arr =[];
    //             await Promise.all(user.friendId.map(async(id)=>{
    //                 const res = await axios.get(`${base_url}/api/details/user?id=${id}&other=allPostsId`);
    //                 arr.push(...res.data.result.PostId);
    //               }))
    //               setGroupId([...arr]);
    //         }
    //     }
    // },[user])
    const data=[
        {
            name:"chirag",
            compensation:"Paid",
            image:"ewdf",
            time:'1d ago',
            title:"Need a co-founder",
            desc:"irwhgrwigj aifjidif ajfodjfo pfjdaofd ohjfdo fofkapfokifp df",
            category:["CS","PS","GS"],
        },
        {
            name:"chirag",
            compensation:"Paid",
            image:"ewdf",
            time:'1d ago',
            title:"Need a co-founder",
            desc:"irwhgrwigj aifjidif ajfodjfo pfjdaofd ohjfdo fofkapfokifp df",
            category:["CS","PS","GS"],
        }
    ]
   return (
    <div className={style.groupFrame}> 
        <div className={style.createPost} onClick={()=>setOpen(true)}>Post</div>
        {open===true && (<CreateGroup setOpen={setOpen}/>)}

        <div>
            {
                data.map((d,ind)=>(
                    <div className={style.groupBox}>
                        <div className={style.head}>
                            <img src={d.image}></img>
                            <div className={style.nameTitle}>
                                <h4>{d.name}</h4>
                                <span>{d.time}</span>
                            </div>
                            <h4 className={style.compensation}>{d.compensation}</h4>
                        </div>
                        <div className={style.body}>
                            <h2>{d.title}</h2>
                            <p>{d.desc}</p>
                            <div>
                            {
                                d.category.map((cat)=>(
                                    <span>{cat}</span>
                                ))
                            }
                            </div>
                            
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
   
   )
 }
 
 export default Group