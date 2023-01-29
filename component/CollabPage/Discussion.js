import React from 'react'
import style from './style.module.scss';
import { useState } from 'react';
import CreateDiscussion from './CreateDiscussion';
import useSWR from 'swr';
import base_url from '../../utils/connection';
import {useSelector} from 'react-redux';
import axios from 'axios';

const Discussion = () => {
    const user = useSelector((state)=>state.user);
    const [open,setOpen] = useState(false);

    const {data,error} = useSWR(user._id===null?null:`${base_url}/api/post/discusspost`,async function fetcher(){
        let arr =[];
        await Promise.all(user.categoryId.map(async(cat)=>{
            const res = await axios.get(`${base_url}/api/categorys/updateCategories?category=${cat}&other=DiscussionIds`);
            arr.push(...res.data.resp[0].DisscussionId);
        }));
        let discussPost =[];
        await Promise.all(arr.map(async(id)=>{
            const res= await axios.get(`${base_url}/api/post/discusspost?id=${id}`);
            if(res.data!==null){
                discussPost.push(res.data);
            }
        }))
        return discussPost;
    });
    

   if (error) {
    console.log(error);
    return <div>error</div>}
  
    console.log(data);
    if (!data) return <h1>loading...</h1>
    
   
  return (
    <div className={style.groupFrame}> 
        {console.log(data)}
        <div className={style.createPost} onClick={()=>setOpen(true)}>Ask</div>
        {open===true && <CreateDiscussion setOpen={setOpen}/>}

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

    </div>
  )
}

export default Discussion