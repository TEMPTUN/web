import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import style from './Index.module.scss'
import axios from 'axios';
import base_url from '../../utils/connection';
import Post from './Post';
import { doc,getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/fireconnect";

const Feed = () => {
  const user = useSelector((state)=>state.user);
  const [postId,setPostId] = useState([]);
  const [allPost,setAllPost] = useState([]);
  const[category,setCategory] = useState("All");

  useEffect(()=>{
    if(user._id!==null && allPost.length===0){
      async function getFreindsPostId(){
        let arr =[];
        await Promise.all(user.friendId.map(async(id)=>{
          const res = await axios.get(`${base_url}/api/details/user?id=${id}&other=allPostsId`);
          arr.push(...res.data.result.PostId);
        }))

        setPostId([...arr]);
        }
      getFreindsPostId();
    }
  },[user]);

  useEffect(()=>{
    if(user._id!==null){
      async function getFreindsPost(){
        let arr =[];
        await Promise.all(postId.map(async(id)=>{
          const docRef = doc(db, "posts", id);
          const docSnap = await getDoc(docRef);
          if(docSnap.exists()){
            const res = docSnap.data();
            res.id = id;
            arr.push(res);
          }
        }))
        setAllPost([...arr]);
      }
      getFreindsPost();
    }
  },[postId]);

  useEffect(()=>{
    if(category!=="All"){
      async function getselectedPost(){
        let arr =[];
        const result=await axios.get(`${base_url}/api/categorys/getposts?catname=${category}`);
        arr=result.data.result[0].postIds;
        console.log(arr);
        setPostId(arr);
      }
      getselectedPost();
    }
  },[category]);

  return (      
    <>
      <div className={style.showCategory}>
          <span onClick={()=>setCategory("All")} style={{backgroundColor:category==='All'?"#ffc491":"transparent",color:category==='All'?"black":"#cacaca"}}>All</span>
          {
            category!=='All' &&  (<span style={{backgroundColor:"#ffc491",color:"black"}}>{category}</span>)  
          }
          
          {
              user.categoryId.map((cat)=>(
                cat!==category && <span onClick={()=>setCategory(cat)} >{cat}</span>
              ))
            }
      </div>
      <div className={style.feedFrame}>
        {
          allPost.map((post,idx)=>(
            <Post key={"post"+idx} post={post}/>
          ))
        }
      </div>
      </>
  )
}

export default Feed;