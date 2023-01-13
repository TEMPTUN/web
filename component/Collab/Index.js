import axios, { all } from 'axios';
import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux';
import base_url from '../../utils/connection';
import style from './Collab.module.scss';

const Index = () => {
    
  const user = useSelector((state)=>state.user);
  const [allUserId,setAllUserId] = useState([]);
  const [allUser,setAllUser] = useState([]);

  useEffect(()=>{
      if(user._id!==null){
        async function fetchSuggestion(){
          let userCategories = user.categoryId;
          let arr= new Set();
          await Promise.all(userCategories.map(async(cat)=>{
              const res = await axios.get(`http://localhost:3000/api/categorys/updateCategories?category=${cat}`);
              arr = new Set([...arr, ...res.data.resp[0].userId]);
          }));
          console.log(arr);
          setAllUserId([...allUser,...Array.from(arr)]);
        }
        fetchSuggestion();
      }
  },[user]);

  useEffect(()=>{
    async function getUserDetails(){
      let arr =[]
      await Promise.all(allUserId.map(async(id,idx)=>{
        const res = await axios.get(`${base_url}/api/details/user?id=${id}&other=all`);
        arr.push(res.data.result);
      }))
      setAllUser([...allUser,...arr]);
    }
    getUserDetails();
  },[allUserId]);

  return (
    <div>
        {user.name}
        {user._id}
        <div className={style.userCont}>
          {
            allUser.map((sug,idx)=>(
              <div key={idx} style={{width:"35%"}}>
                  {
                    sug._id!==user._id && 
                    (<div className={style.box}>
                      <img src={sug.image}></img>
                      <h4>{sug.name}</h4>
                      <button>Collab</button>
                    </div>)
                  }
              </div>
            ))
          }
        </div>
       
    </div>
  )
}
export default Index;
