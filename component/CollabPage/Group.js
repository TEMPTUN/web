 import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
 import CreateGroup from './CreateGroup'
 import style from './style.module.scss'
 import { useSelector } from 'react-redux'
 import axios from 'axios';
 import base_url from '../../utils/connection'

 const Group = () => {
    const [open,setOpen] = useState(false);
    const [groupId,setGroupId] = useState([]);
    const [group,setGroup] = useState(null);
    const user = useSelector((state)=>state.user);
    useEffect(()=>{
            async function getGroupIds(){
                let arr =[];
                await Promise.all(user.categoryId.map(async(cat)=>{
                    const res = await axios.get(`${base_url}/api/categorys/updateCategories?category=${cat}&other=groupIds`);
                    arr.push(...res.data.resp[0].GroupsIds);
                  }))
                  setGroupId([...arr]);
            }
            getGroupIds();
    },[user])

    useEffect(()=>{
        async function getGroups(){
            if(groupId!==[]){
                let arr=[];
                await Promise.all(groupId.map(async(id)=>{
                    const res= await axios.get(`${base_url}/api/group/fetch?id=${id}`);
                    console.log(res.data.result);
                    if(res.data.result!==null){
                        arr.push(res.data.result);
                    }
                }))
                setGroup(arr);
            }
        }
        getGroups();
    },[groupId]);

    if(group===null){
        return <div>Loading.........</div>;
    }
   return (
    <div className={style.groupFrame}> 
        <div className={style.createPost} onClick={()=>setOpen(true)}>Post</div>
        {open===true && (<CreateGroup setOpen={setOpen}/>)}
         {group!==null && (
             <div>
             {
                 group.map((d,ind)=>(
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
 
 export default Group