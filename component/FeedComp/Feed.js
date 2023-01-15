import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import style from './Index.module.scss'
import axios from 'axios';
import base_url from '../../utils/connection';
import ReactPlayer from "react-player";

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
          <div className={style.feed}>
            <div className={style.info}>
              <img src={post.image}></img>
              <h5>{post.name}</h5>
            </div>
            <div className={style.description}>{post.description}</div>
            {
              (post.url || post.media) && (
                <div className={style.media}>
                  {post.url && <ReactPlayer  className="react-player" playing={true} controls={true} width={"100%"} url={post.url}/>}
                  {post.media && ReactPlayer.canPlay(post.media)===false && <img src={ post.media} alt="" />}
                  {post.media && ReactPlayer.canPlay(post.media) && <ReactPlayer  className="react-player" onClick={()=>{console.log("video")}} playing={true} controls={true} width={"100%"} url={post.media} />}
                </div>
              )
            }
            <div className={style.social}>
              <img src={'/images/like.svg'}></img>
              <img src="/images/comment-icon.svg" alt="" />
            </div>
          </div>
        ))
      }
     
    </div>
  )
}

export default Feed