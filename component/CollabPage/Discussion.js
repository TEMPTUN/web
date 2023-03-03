import React from 'react'
import style from './style.module.scss';
import { useState } from 'react';
import CreateDiscussion from './CreateDiscussion';
import useSWR from 'swr';
import base_url from '../../utils/connection';
import {useSelector} from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { doc,getDoc } from 'firebase/firestore';
import { db } from '../../utils/fireconnect';
import Link from 'next/link';
import Filter from './Filter';
import CircleLoader from "react-spinners/CircleLoader";

const Discussion = () => {
    const user = useSelector((state)=>state.user);
    const [open,setOpen] = useState(false);
    const [categorydiss,setcategorydiss] = useState([]);
    const [load,setLoad]=useState(true);
    const [myWork,setMyWork] = useState(false);


    const {data,error} = useSWR(user._id===null?null:`${base_url}/api/post/discusspost`,async function fetcher(){
        let arr =[];
        await Promise.all(user.categoryId.map(async(cat)=>{
            const res = await axios.get(`${base_url}/api/categorys/updateCategories?category=${cat}&other=DiscussionIds`);
            if(res.data.resp.length!==0)
                arr.push(...res.data.resp[0].DisscussionId);
        }));
        setcategorydiss(arr)
        let discussPost =[];
        console.log(arr);
        await Promise.all(arr.map(async(id)=>{
            const docRef=doc(db,'discussion',id);
            const docSnap=await getDoc(docRef);
            if(docSnap.exists()){
                const data = docSnap.data();
                data.id= id;
                discussPost.push(data);
            }
        }))

        return discussPost;
    });

   if (error) { 
    console.log(error)
    return <div>error</div>}
  
    if (!data) return 
    (
        setTimeout(()=>{
            setLoad(false);
          },1000)
    )
    
   
  return (
    <div className={style.groupFrame}> 
        {load && 
        <div className={style.loader}>
          <CircleLoader color="#369cd6" loading={load} size={50}  />
          <h3>Find your Complement</h3>
        </div>}
        <div className={style.createPost} onClick={()=>setOpen(true)}>Ask</div>
        <Filter opt={"Discussion"} setMyWork={setMyWork}/>
        {open===true && <CreateDiscussion setOpen={setOpen}/>}

        {myWork===false && <div style={{width:"95%"}}>{
                data.map((d,ind)=>(
                   
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
                        <div className={style.chatCont}>
                            <Link href={
                                {
                                    pathname:'/chat',
                                    query:{id:d.id}
                                }
                            }>Start Discussion</Link>
                        </div>
                    </div>
                ))
            }
        </div>}

        {myWork===true && <div style={{width:"95%"}}>
                <p>my work</p>
        </div>}

    </div>
  )
}

export default Discussion