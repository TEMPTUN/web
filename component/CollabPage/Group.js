 import React from 'react'
import { useState } from 'react'
 import CreateGroup from './CreateGroup'
 import style from './style.module.scss'
 import { useSelector } from 'react-redux'
 import axios from 'axios';
 import base_url from '../../utils/connection'
 import useSWR from 'swr'

 const Group = () => {
    const [open,setOpen] = useState(false);
    const user = useSelector((state)=>state.user);

    const{data,error} = useSWR(user._id===null?null:`${base_url}/api/group/fetch`,async function fetcher(){
        let arr =[];
        await Promise.all(user.categoryId.map(async(cat)=>{
            const res = await axios.get(`${base_url}/api/categorys/updateCategories?category=${cat}&other=groupIds`);
            arr.push(...res.data.result[0].GroupsIds);
        }))
        let groupPost =[];
        await Promise.all(arr.map(async(id)=>{
            const res= await axios.get(`${base_url}/api/group/fetch?id=${id}`);
            if(res.data.result!==null){
                groupPost.push(res.data.result);
            }
        }))
        return groupPost;
    });
    if(error){
        return<>Error</>
    }
    if(!data){
        return <div>Loading.........</div>;
    }
   return (
    <div className={style.groupFrame}> 
        <div className={style.createPost} onClick={()=>setOpen(true)}>Post</div>
        {open===true && (<CreateGroup setOpen={setOpen}/>)}
         {data!==null && (
             <div style={{width:"95%"}}>{
                data.map((d,ind)=>(
                    <div className={style.groupBox} key={ind+'gp'}>
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
                                d?.category.map((cat,indx)=>(
                                    <span key={indx+"mc"}>{cat}</span>
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