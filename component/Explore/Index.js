import axios, { all } from 'axios';
import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux';
import base_url from '../../utils/connection';
import style from './Explore.module.scss';

const Index = () => {
    
  const user = useSelector((state)=>state.user);
  const [allUserId,setAllUserId] = useState([]);
  const [allUser,setAllUser] = useState([]);
  const[collabed,setCollabed] = useState(new Set());

  useEffect(()=>{
      if(user._id!==null){
        async function fetchSuggestion(){
          let userCategories = user.categoryId;
          let arr= new Set();
          await Promise.all(userCategories.map(async(cat)=>{
              const res = await axios.get(`${base_url}/api/categorys/updateCategories?category=${cat}`);
              res.data.resp[0].userId.map((id)=>{
                if(user.friendId.includes(id)===false){
                  arr.add(id);
                }
              });                
          }));
          setAllUserId([...allUser,...Array.from(arr)]);
        }
        fetchSuggestion();
      }
  },[user]);

  useEffect(()=>{
    async function getUserDetails(){
      let arr =[]
      await Promise.all(allUserId.map(async(id,idx)=>{
        const res = await axios.get(`${base_url}/api/details/user?id=${id}&other=allFriendsId`);
        arr.push(res.data.result);
      }))
      setAllUser([...allUser,...arr]);
    }
    getUserDetails();
  },[allUserId]);

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
        {user.name}
        {user._id}
        <div className={style.userCont}>
          {console.log(allUser)}
          {
            allUser.map((sug,idx)=>(
              <>{
                sug!==undefined && (
                <div key={idx} className={style.box}>
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
