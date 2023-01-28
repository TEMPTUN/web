import React,{useEffect,useState} from 'react'
import style from './Index.module.scss'
import ReactPlayer from 'react-player'
import axios  from 'axios';
import base_url from '../../utils/connection';
import { useDispatch, useSelector } from 'react-redux'
import { updateDoc } from "firebase/firestore";
import { db } from "../../utils/fireconnect";
import { doc,getDoc,onSnapshot,addDoc,collection } from "firebase/firestore";
import FullPost from './FullPost';
import { useRouter } from 'next/router';
 

const Post = ({post}) => {
    const user = useSelector((state)=>state.user);
    const [postData,setsPostData] = useState(post);
    const[openComment,setComment]= useState(false);
    

    useEffect(()=>{
        const unsub = onSnapshot(doc(db, "posts", post.id),(doc)=>{
        if(doc.exists()){
            const res = doc.data();
            res.id = post.id;
            setsPostData(res);
        }});
        return unsub;
    },[])

    const handleFullPost = ()=>{
        setComment(!openComment);
    }
    const handleLike = async(id)=>{  //post id is passed whihc is to be liked
        const postref = doc(db, "posts", id);
        const docSnap = await getDoc(postref);
        const data = docSnap.data();
        if(data.likeId!==undefined &&  data.likeId.includes(user._id)){
            await updateDoc(postref, {
                likeId: data.likeId.filter((id)=>{
                    id!==user._id;
                })
            });
           return;
        }
        await updateDoc(postref, {
            likeId: data.likeId===undefined?[user._id]:[...data.likeId,user._id]
        });    
    }

  return (
    <>
        
                <div className={style.feed}>
                <div className={style.info}>
                    <img src={postData?.image}></img>
                    <h3>{postData?.name}</h3>
                </div>
                <div className={style.description} onClick={()=>setComment(false)}>{postData?.description}</div>
                {
                (post?.url || post?.media) && (
                    <div className={style.media} >
                        {postData.url && <ReactPlayer  className="react-player" playing={true} controls={true} width={"100%"} url={postData.url}/>}
                        {postData.media && ReactPlayer.canPlay(postData.media)===false && <img src={ post.media} alt="" />}
                        {postData.media && ReactPlayer.canPlay(postData.media) && <ReactPlayer  className="react-player" onClick={()=>{console.log("video")}} playing={true} controls={true} width={"100%"} url={post.media} />}
                    </div>
                )}
                <div className={style.social}>
                    <div>
                        <img src={'/images/like.svg'} onClick={()=>handleLike(postData.id)}></img> 
                        {postData?.likeId?.length}    
                    </div>
                   
                    <div onClick={()=>handleFullPost()}>
                    <img src="/images/comment-icon.svg" alt="" />
                        {postData?.commentId?.length}    
                    </div>
                </div>
                <hr style={{margin: "8px 0px"}}></hr>
                </div> 
                {
                    openComment===true && <FullPost post={postData} setComment={setComment}/>
                }
    </>
  )
}

export default Post