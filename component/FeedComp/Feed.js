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
          if(categoryData.hasOwnProperty(cat) && categoryData[cat].has(res)===false){
            categoryData[cat] = new Set([...categoryData[cat],res]);
          }
         else{
            categoryData[cat]=new Set([res]);
          }
        });
      }
    }))
    setCatData(categoryData);
    return postIds;

  })

  if(!data){
    return<h1> Loading...</h1>
  }

  return (      
    <>
   
      <div className={style.feedFrame}>
        <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div className={style.showCategory}>
          <span onClick={()=>setCategory("All")} style={{backgroundColor:category==='All'?"#ffc491":"transparent",color:category==='All'?"black":"#cacaca"}}>All</span>
            {
              user.categoryId.map((cat,index)=>(
                  <span onClick={()=>setCategory(cat)}  style={{backgroundColor:cat!==category?"transparent":"#ffc491",color:cat!==category?"white":"black"}} key={index+"cat"} >{cat}</span>
              ))
            }
        </div>
          <img src={'/images/search.png'} style={{height:"20px",marginRight:"10px"}}></img>
        </div>
    
        {
          category==="All"?(
            data.map((post,idx)=>(
              <Post key={"post"+idx} post={post}/>
            ))
          ):(
            catData[category]!==undefined && Array.from(catData[category]).map((post,idx)=>(
              <Post key={"post"+idx} post={post}/>
            ))
          )
          
        }
      </div>
      </>
  )
}

export default Feed;