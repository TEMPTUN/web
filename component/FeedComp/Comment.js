import React, { useEffect } from 'react'
import style from './Index.module.scss'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { db } from "../../utils/fireconnect";
import {updateDoc, doc,getDoc,addDoc,collection} from "firebase/firestore";
import { motion ,AnimatePresence} from 'framer-motion';

const Comment = ({post,setComment,openComment}) => {
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
  const handleClose = ()=>{
    setComment(false)
  }
  return (
    
    <motion.div className={style.commentFrame} viewport={{once:true}} initial={{y:300}} whileInView={{y:0}} transition={{type: "tween"}} exit={{y:300}}>
      <div as={motion.div} whileHover={{scale:1.2}} className={style.commcursor} onClick={()=>handleClose()} ></div>
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
    </motion.div>
  )
}

export default Comment