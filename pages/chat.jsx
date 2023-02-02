import React from 'react'
import { useSelector } from 'react-redux'
import { db } from '../utils/fireconnect'
import { collection, addDoc, Timestamp,doc,updateDoc,getDoc } from "firebase/firestore";
import { useEffect,useState } from 'react';
import { useRouter } from 'next/router';
import { onSnapshot } from "firebase/firestore";
import styles from '../styles/chat.module.scss'


const chat = () => {
    const router = useRouter();
    const [messages, setMessages] = React.useState("");
    const [messageId, setMessageId] = useState([]);
    const [comments, setcomments] = useState([]);
    const [id,setId] = useState(null);
    
    const user = useSelector((state)=>state.user);
    useEffect(() => {
        setId(router.query.id);
    },[router.query.id]);

    const handlechat = async(e) => {
        e.preventDefault();
        const docref = await addDoc(collection(db, "messages"), {
            text:messages,
            messager_id:user._id,
            messager_name:user?.name||null,
            messager_image:user?.image||null,
            createdAt:Timestamp.fromDate(new Date()),
          });
          // console.log(docref);
          if(id){
            const discussref = doc(db, "discussion", id);
            const docSnap = await getDoc(discussref);
            const data = docSnap.data();
            setMessageId([...data.messageId, docref.id]);
            updateDoc(discussref, {
                messageId: [...data.messageId, docref.id]
            });
            console.log(messageId);
          }
          
    }

    const handle = async(e) => {
        const message = e.target.value;
        setMessages(message);
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

  return (
    <div className={styles.frame}>
        <h1>Chat</h1>
        {console.log(id)}
        {comments.map((comment)=>{
            return(
                <div className={styles.comment_box}>
                  <div style={user._id!==comment.messager_id?{borderLeft:"2px solid red",paddingLeft:"5px"}:{borderLeft:"2px solid blue",paddingLeft:"5px"}}>
                    <h3>{user._id!==comment.messager_id?comment.messager_name:"You"}</h3>
                    <p>{comment.text}</p>
                  </div>
                </div>
            )
        })}
        <div className={styles.input_box}>
            <input type="text" placeholder="Enter your message" onChange={(e)=>handle(e)}/>
            <button onClick={(e)=>handlechat(e)}>Send</button>
        </div>
    </div>
  )
}

export default chat