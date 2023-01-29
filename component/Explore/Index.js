import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux';
import base_url from '../../utils/connection';
import style from './Explore.module.scss';
import { doc,getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/fireconnect";
import useSWR from 'swr';

const Index = () => {  
  const user = useSelector((state)=>state.user);
  const[collabed,setCollabed] = useState(new Set());

  const {data,error} = useSWR(user._id===null?null:`${base_url}/api/details/user?ther=allFriendsId`,async function fetcher(){
      let arr= new Set();
      await Promise.all(user.categoryId.map(async(cat)=>{
          const res = await axios.get(`${base_url}/api/categorys/updateCategories?category=${cat}&other=friendId`);
          res.data.resp[0].userId.map((id)=>{
            if(user.friendId.includes(id)===false){
              arr.add(id);
            }
          });                
      }));

      let allUser =[]
      await Promise.all(Array.from(arr).map(async(id,idx)=>{
        const res = await axios.get(`${base_url}/api/details/user?id=${id}&other=allFriendsId`);
        allUser.push(res.data.result);
      }))
      console.log(allUser);
      return allUser;
  })
  

  if(!data){
    return <h1>Loading....</h1>
  }

  const handleCollab = async(id)=>{
    try{
      if(collabed.has(id)===false){
        await axios.put(`${base_url}/api/details/user`,{id:user._id,friendId:id});
        setCollabed(new Set([...collabed,id]));
      }else{
        console.log(friends);
      }
    }catch(err){
      console.log("--------------------handleCollab---------------------");
      console.log(err);
    }
  }

  return (
    <div className={style.frame}>
      <input type="text" placeholder='Search'></input>
         
      <div className={style.userCont}>
        {
          data.map((sug,idx)=>(
            <>{
              sug!==undefined && (
              <div key={idx+"sug"} className={style.box}>
                <img src={sug.image}></img>
                <h4>{sug.name}</h4>
                {!collabed.has(sug._id) && <button onClick={(e)=>handleCollab(sug._id)}>Collab</button>}
                {collabed.has(sug._id) && <button >Friends</button>}  
              </div>
            )}
            </>
          ))
        }
      </div>
         
       
       
    </div>
  )
}
export default Index;
