import React, { useEffect } from 'react'
import style from './Index.module.scss'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { db } from "../../utils/fireconnect";
import {updateDoc, doc,getDoc,addDoc,collection} from "firebase/firestore";

const FullPost = ({post,setComment}) => {
  const user = useSelector((state)=>state.user);
  const [comments,setComments] = useState([]);
  const [write,setWrite] = useState("");

  useEffect(()=>{
   
    async function fetchComment(){
      let arr=[];
      await Promise.all(
        post.commentId.map(async(comment)=>{
          const commentref = doc(db, "comments", comment);
          const docSnap = await getDoc(commentref);
          const data = docSnap.data();
          if(data!==undefined)
            arr.push(data);
        })
      )
      setComments(arr);
    }
    fetchComment();
    
  },[post]);

  const handleSubmit = async(str)=>{
    const commentref=await addDoc(collection(db, "comments"), {
      comment:str,
      commentor_id:user._id,
      commentor_name:user.name,
      commentor_image:user.image,
    });
    const postref = doc(db, "posts", post.id);
    const docSnap = await getDoc(postref);
    const data = docSnap.data();
    updateDoc(postref, {
        commentId: data.commentId===undefined?[commentref.id]:[...data.commentId, commentref.id]
    });
  }
  return (
    <div className={style.commentFrame}>
      <div className={style.commcursor} onClick={()=>setComment(false)}></div>
    <div className={style.inputFrame}>
      <input type='text' placeholder='Comment...' onChange={(e)=>setWrite(e.target.value)}></input>
      <button onClick={()=>handleSubmit(write)}>Submit</button>
    </div>
    <div className={style.comments}>
      {
        comments.map((commData,idx)=>{
          return(
            <div key={idx+"comm"} className={style.commFrame}>
              <img src={commData.commentor_image}></img>
              <div className={style.commentBox}>
                <h3>{commData?.commentor_name}</h3>
                <span>{commData?.comment}</span>
              </div>
            </div>
           
          )
        })
      }
      
    </div>
  </div>    
  )
}

export default FullPost