import React from 'react'
import { useSelector } from 'react-redux'
import { db } from '../../utils/fireconnect'
import { collection, addDoc, Timestamp,doc,updateDoc,getDoc } from "firebase/firestore";
import { useEffect,useState } from 'react';
import { useRouter } from 'next/router';
import { onSnapshot } from "firebase/firestore";
import styles from '../../styles/chat.module.scss'


const Chat = () => {
    const router = useRouter();
    const [messages, setMessages] = React.useState("");
    const [messageId, setMessageId] = useState([]);
    const [comments, setcomments] = useState([]);
    const [id,setId] = useState(null);
    const [load,setLoad] = useState(false);
    
    const user = useSelector((state)=>state.user);
    useEffect(() => {
        setId(router.query.id);
    },[router.query.id]);

    const handlechat = async(e) => {
        setLoad(true); 
        e.preventDefault();
        setMessages("");
        const docref = await addDoc(collection(db, "messages"), {
            text:messages,
            messager_id:user._id,
            messager_name:user?.name||null,
            messager_image:user?.image||null,
            createdAt:Timestamp.fromDate(new Date()),
          });
          if(id){
            const discussref = doc(db, "discussion", id);
            const docSnap = await getDoc(discussref);
            const data = docSnap.data();
            setMessageId([...data.messageId, docref.id]);
            updateDoc(discussref, {
                messageId: [...data.messageId, docref.id]
            });
          }
          setLoad(false);
    }

    const handle = async(e) => {
        const message = e.target.value;
        setMessages(message);
    }

    const handleOut = ()=>{
      router.back();
    }

    useEffect(() => {
          if(id){
              const discuss = onSnapshot(doc(db, "discussion", id), (doc) => {
                  if(doc.exists()){
                      setMessageId(doc.data().messageId);
                  }
              });
          }

    },[id]);

    useEffect(() => {
        const fetchMessage = async() => {
          if(messageId.length>0){
            let arr=[];
            await Promise.all(
              messageId.map(async(comment)=>{
                const messeageref = doc(db, "messages", comment);
                const docSnap = await getDoc(messeageref);
                const data = docSnap.data();
                if(data!==undefined)
                  arr.push(data);
              })
            )
            setcomments(arr);
          }
        }
        fetchMessage();
    },[messageId]);

    useEffect(()=>{
      let elem = document.getElementById("bott");
      elem.scrollIntoView();
    },[load,comments]);

  return (
    <div className={styles.frame} id="frame">
      <div style={{width:"100%",position:"fixed",top:"0px",display:"flex",alignItems:"center",backgroundColor:"white",zIndex:"99"}}>
      <img src={'images/leftArroa.png'} onClick={()=>handleOut()}></img><p style={{fontSize:"22px"}}>Chat</p>
      </div>
        {comments.map((comment,idx)=>{
            return(
                <div className={styles.comment_box} style={user._id!==comment.messager_id?{}:{left:"60%"}} >
                  <div style={user._id!==comment.messager_id?{borderLeft:"2px solid red",paddingLeft:"5px"}:{borderLeft:"2px solid blue",paddingLeft:"5px"}}>
                    <h3>{user._id!==comment.messager_id?comment.messager_name:"You"}</h3>
                    <p>{comment.text}</p>
                  </div>
                </div>
            )
        })}
        <div id="bott" style={{height:"50px",width:"100%"}}></div>
        <div className={styles.input_box}>
            <input type="text" value={messages} placeholder="Enter your message" onChange={(e)=>handle(e)}/>
            <button onClick={(e)=>handlechat(e)} disabled={load}>Send</button>
        </div>
    </div>
  )
}

export default Chat