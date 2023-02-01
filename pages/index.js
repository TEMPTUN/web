import React, { useState } from 'react'
import {useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Timestamp } from 'firebase/firestore';
import { doc, getDoc, setDoc,collection } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';
import { db } from '../utils/fireconnect';

const Home = ()=> {
  const [message,setMessage] = useState([]);
  const [write,setwrite] = useState("");
  const user = useSelector((state)=>state.user);
  
  useEffect(()=>{
    // const getmessage = async()=>{
    //   const docRef = doc(db, "messages");
    //   const docSnap = await getDoc(docRef);
    //   if (docSnap.exists()) {
    //     setMessage(docSnap.data().text);
    //   }
    // }
    // getmessage();
  },[])

  const handlesubmit=async()=>{
    const doc = await addDoc(collection(db, "messages"), {
      text:write,
      messager_id:user._id,
      messager_name:user?.name||null,
      messager_image:user?.image||null,
      createdAt:Timestamp.fromDate(new Date()),
    });
    console.log(doc.id);
    console.log(new Date().toDateString());
  }

  return (
    <>
      {/* {message?.map((msg)=>{
        return <div>{msg.text}</div>
      })
      } */}
      <input onChange={(e)=>setwrite(e.target.value)}></input>
      <button onClick={()=>handlesubmit()}>submit</button>
    </>
  )
}
export default Home