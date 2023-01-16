import axios, { all } from 'axios';
import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux';
import base_url from '../../utils/connection';
import style from './Explore.module.scss';

const Index = () => {
    
  const user = useSelector((state)=>state.user);
  const [allUserId,setAllUserId] = useState([]);
  const [allUser,setAllUser] = useState([]);
  const[allContentId,setAllContentId] = useState([]);
  const[allContent,setAllContent] = useState([]);

  const[collabed,setCollabed] = useState(new Set());
  const[box,setBox] = useState("post");

  useEffect(()=>{
      if(user._id!==null){
        async function fetchSuggestion(){
          let userCategories = user.categoryId;
          let arr= new Set();
          await Promise.all(userCategories.map(async(cat)=>{
              const res = await axios.get(`${base_url}/api/categorys/updateCategories?category=${cat}&other=friendId`);
              res.data.resp[0].userId.map((id)=>{
                if(user.friendId.includes(id)===false){
                  arr.add(id);
                }
              });                
          }));
          setAllUserId([...Array.from(arr)]);
        }
        fetchSuggestion();

        async function fetchContent(){
          let userCategories = user.categoryId;
          let arr= new Set();
          await Promise.all(userCategories.map(async(cat)=>{
              const res = await axios.get(`${base_url}/api/categorys/updateCategories?category=${cat}&other=postId`);
              res.data.resp[0].postIds.map((id)=>{
                if(user.PostId.includes(id)===false){
                  arr.add(id);
                }
              });                
          }));
          setAllContentId([...Array.from(arr)]);
        }
        fetchContent();



      }
  },[user]);

  useEffect(()=>{
    async function getUserDetails(){
      let arr =[]
      await Promise.all(allUserId.map(async(id,idx)=>{
        const res = await axios.get(`${base_url}/api/details/user?id=${id}&other=allFriendsId`);
        arr.push(res.data.result);
      }))
      setAllUser([...arr]);
    }
    getUserDetails();
  },[allUserId]);

  useEffect(()=>{
    async function getContent(){
      let arr =[]
      await Promise.all(allContentId.map(async(id,idx)=>{
        const res = await axios.get(`${base_url}/api/post/postAPI?id=${id}&other=allPostsId`);
        arr.push(res.data.result);
      }))
      setAllContent([...arr]);
    }
    getContent();
  },[allContentId]);

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
          {console.log(allUser)}
        <input type="text" placeholder='Search'></input>
        <div className={style.toggle}>
                <button style={{background:box==='post'?"rgba(79, 79, 79, 0.1)":"none"}} onClick={()=>setBox("post")}>Contents</button>
                <span style={{color:"#FF955B"}}>|</span>
                <button style={{background:box==='user'?"rgba(79, 79, 79, 0.1)":"none"}} onClick={()=>setBox("user")}>Network</button>
            </div>
        {box==='post' && (
          <div className={style.postCont}>
            {
              allContent.map((post,idx)=>( 
                <div className={style.post} key={'post'+idx}>
                  <img src={post.image}></img>
                  <h4>{post.name}</h4>
                  <h4>{post.description}</h4>
                </div>
                
              ))
            }
          </div>
        )}
        {
          box==='user' && (
            <div className={style.userCont}>
              {
                allUser.map((sug,idx)=>(
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
          )
        }
       
       
    </div>
  )
}
export default Index;
