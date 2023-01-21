import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import style from './Index.module.scss'
import axios from 'axios';
import base_url from '../../utils/connection';
import Post from './Post';

const Feed = () => {
  const user = useSelector((state)=>state.user);
  const [postId,setPostId] = useState([]);
  const [allPost,setAllPost] = useState([]);

  useEffect(()=>{
    if(user._id!==null){
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
          const res = await axios.get(`${base_url}/api/details/userpost?id=${id}&other=allPosts`);
          console.log(res);
          arr.push(res.data.result);
        }))
        console.log(arr);
        setAllPost([...arr]);
      }
      console.log("in Post")
      getFreindsPost();
    }
  },[postId]);

  return (
    <div className={style.feedFrame}>
      {
        allPost.map((post,idx)=>(
          <Post post={post}/>
        ))
      }
     
    </div>
  )
}

export default Feed