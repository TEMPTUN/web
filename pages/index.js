import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import base_url from '../utils/connection'
import { useRouter } from 'next/router'
import {useSelector,useDispatch } from 'react-redux';
import {updateId} from '../redux_feature/UserInfo/userSlice' 
import { useEffect } from 'react';
import Live from '../component/Livechat/Live';

const Home = ()=> {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [comment,setComment] = useState([]);

  

  return (
    <>
      <div>
      <h1>Chat app</h1>
      <h1>Enter a username</h1>

      <input value={username} onChange={(e) => setUsername(e.target.value)} />

      <br />
      <br />

      <div>
        {comment.map(({ username, message }, index) => (
          <div key={index}>
            {username}: {message}
          </div>
        ))}

        <br />

        {/* <form onSubmit={handleSubmit}>
          <input
            name="message"
            placeholder="enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete={"off"}
          />
        </form> */}
      </div>
    </div>
    </>
  )
}
export default Home