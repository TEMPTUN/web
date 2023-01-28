import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import style from './Index.module.scss'
import axios from 'axios';
import base_url from '../../utils/connection';
import Post from './Post';
import { doc,getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/fireconnect";
import useSWR from 'swr';

const Feed = () => {
  const user = useSelector((state)=>state.user);
  const[category,setCategory] = useState("All");
  const [catData,setCatData] = useState({});

  const {data,error} = useSWR(user._id===null?null:`${base_url}/api/details/user?other=allPostsId`, async function fetcher(){
    let arr =[];
    console.log(user);
    await Promise.all(user.friendId.map(async(id)=>{
      const res = await axios.get(`${base_url}/api/details/user?id=${id}&other=allPostsId`);
      arr.push(...res.data.result.PostId);
    }));
    let postIds = [];
    let categoryData = catData;
    await Promise.all(arr.map(async(id)=>{
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        const res = docSnap.data();
        res.id = id;
        postIds.push(res);
        res.categoryIds.map((cat)=>{
          console.log(categoryData.hasOwnProperty(cat))
          if(categoryData.hasOwnProperty(cat)){
            categoryData[cat] = [...categoryData[cat],res];
          }
         else{
            categoryData[cat]=new Set([res]);
          }
        });
      }
    }))
    console.log(postIds)
    setCatData(categoryData);
    console.log(categoryData);
    return postIds;

  })

  if(!data){
    return<h1> Loading...</h1>
  }

  return (      
    <>
    <div className={style.showCategory}>
        <span onClick={()=>setCategory("All")} style={{backgroundColor:category==='All'?"#ffc491":"transparent",color:category==='All'?"black":"#cacaca"}}>All</span>
        {
          category!=='All' &&  (<span style={{backgroundColor:"#ffc491",color:"black"}}>{category}</span>)  
        }
         
        {
            user.categoryId.map((cat,index)=>(
              cat!==category && <span onClick={()=>setCategory(cat)}  key={index+"cat"} >{cat}</span>
            ))
          }
        </div>
      <div className={style.feedFrame}>
        {
          category==="All"?(
            data.map((post,idx)=>(
              <Post key={"post"+idx} post={post}/>
            ))
          ):(
            catData[category]!==undefined && catData[category].map((post,idx)=>(
              <Post key={"post"+idx} post={post}/>
            ))
          )
          
        }
      </div>
      </>
  )
}

export default Feed;