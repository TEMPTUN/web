import React,{useEffect,useState} from 'react'
import style from './Index.module.scss'
import ReactPlayer from 'react-player'
import axios  from 'axios';
import base_url from '../../utils/connection';
import { useDispatch, useSelector } from 'react-redux'
import { upLike ,downLike} from '../../redux_feature/UserInfo/userSlice'
import { updateDoc } from "firebase/firestore";
import { db } from "../../utils/fireconnect";
import { doc,getDoc,onSnapshot,addDoc,collection } from "firebase/firestore";
import FullPost from './FullPost';
import { useRouter } from 'next/router';

const Post = ({post}) => {
    const user = useSelector((state)=>state.user);
    const [postData,setsPostData] = useState(post);
    const[comment,setcomment] = useState('');
    const [modal,setmodal]=useState(false);
    const router =  useRouter();

    useEffect(()=>{
        const fetchPost = async()=>{
            const unsub = onSnapshot(doc(db, "posts", post.id),(doc)=>{
            if(doc.exists()){
                const res = doc.data();
                res.id = post.id;
                setsPostData(res);
                console.log("Document data:", res);
            }});
        }
        fetchPost();
        return fetchPost;
      },[])

    const handleFullPost = ()=>{
        setmodal(p => !p);
    }
    const handleLike = async(id)=>{  //post id is passed whihc is to be liked
        const postref = doc(db, "posts", id);
        const docSnap = await getDoc(postref);
        const data = docSnap.data();
        if(data.likeId!==undefined &&  data.likeId.includes(user._id)){
           return;
        }
        await updateDoc(postref, {
            likeId: data.likeId===undefined?[user._id]:[...data.likeId,user._id]
        });    
    }
    const handleComment =async ()=>{
        const commentref=await addDoc(collection(db, "comments"), {
            comment:comment,
            commentor_id:user._id,
            commentor_name:user.name,
            commentor_image:user.image,
        });
        console.log("Document written with ID: ", commentref.id);
        const postref = doc(db, "posts", post.id);
        const docSnap = await getDoc(postref);
        const data = docSnap.data();
        updateDoc(postref, {
            commentId: data.commentId===undefined?[commentref.id]:[...data.commentId, commentref.id]
        });

    }

  return (
    <>
        
                <div className={style.feed}>
                <div className={style.info}>
                    <img src={postData?.image}></img>
                    <h3>{postData?.name}</h3>
                </div>
                {
                (post?.url || post?.media) && (
                    <div className={style.media}>
                        {postData.url && <ReactPlayer  className="react-player" playing={true} controls={true} width={"100%"} url={postData.url}/>}
                        {postData.media && ReactPlayer.canPlay(postData.media)===false && <img src={ post.media} alt="" />}
                        {postData.media && ReactPlayer.canPlay(postData.media) && <ReactPlayer  className="react-player" onClick={()=>{console.log("video")}} playing={true} controls={true} width={"100%"} url={post.media} />}
                    </div>
                )}
                <div className={style.social}>
                    {console.log(postData)}
                    <img src={'/images/like.svg'} onClick={()=>handleLike(postData.id)}></img> 
                    {user?.likeId?.includes(post._id)?<span>You and</span>:<></>}
                    {postData?.likeId?.length}
                    <img src="/images/comment-icon.svg" alt="" onClick={()=>handleFullPost()}/>
                    {modal && 
                    <div>
                        <div>
                            <input type={'text'} value={comment} onChange={(e)=>setcomment(e.target.value)}/>
                            <button onClick={()=>handleComment()}>Comment</button>
                        </div>
                    </div>
                    }
                    {
                        postData?.commentId?.map((comment)=>(
                            <div>{comment}</div>
                        ))
                    }   
                    
                </div>
                <div className={style.description}>{postData?.description}</div>
                </div>

        
    </>
    


   
  )
}

export default Post