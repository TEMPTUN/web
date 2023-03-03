import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import style from './Index.module.scss'
import axios from 'axios';
import base_url from '../../utils/connection';
import Post from './Post';
import { doc,getDoc } from "firebase/firestore";
import { orderBy,limit } from 'firebase/firestore';
import { db } from "../../utils/fireconnect";
import useSWR from 'swr';
import {allCategory} from '../category/category_data'
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { BarLoader } from 'react-spinner';

const Explore = ({setExplore})=>{
  useEffect(()=>{
    document.addEventListener("mousedown",handleClick);

    return ()=>{
      document.removeEventListener("mousedown",handleClick);
    }
  },[]);

  const handleClick = (e)=>{
    if(e.target.className==="Index_categoryFrame__nJRzU" || e.target.className==="Index_exploreFrame__dOPWg" || e.target.className==="Index_categoryFrame__nJRzU" ){
      return;
    }
    setExplore(false);

  }
  return (
        <motion.div className={style.exploreFrame} viewport={{once:true}} initial={{x:150}} whileInView={{x:0}} transition={{type: "tween",duration:"0.5"}} exit={{x:150}}>
          <h2>Categories</h2>
          {console.log(allCategory)}
          <div className={style.categoryFrame}>
            {
              allCategory.map((cat,idx)=>(
                <span className={style.catName}key={idx+"c"} >{cat}</span>
              ))
            }
          </div>
        </motion.div>
    // </div>
   
  )
}

const Feed = () => {
  const user = useSelector((state)=>state.user);
  const[category,setCategory] = useState("All");
  const [catData,setCatData] = useState({});
  const[specificCat,setSpecificCat] = useState([]);
  const [explore,setExplore] = useState(false);
  const [post,setPost] = useState([]);
 

  const {data,error} = useSWR(user._id===null?null:`${base_url}/api/details/user?other=allPostsId`, async function fetcher(){
    let arr = [];
    await Promise.all(user.friendId.map(async(id)=>{
      const res = await axios.get(`${base_url}/api/details/user?id=${id}&other=allPostsId`);
      arr.push(...res.data.result.PostId);
    }));
    let postIds = [];
    let categoryData = catData;
    await Promise.all(arr.map(async(id)=>{
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef,orderBy("date", "desc"), limit(10));
      if(docSnap.exists()){
        const res = docSnap.data();
        res.id = id;
        postIds.push(res);
        res.categoryIds.map((cat)=>{
          if(categoryData.hasOwnProperty(cat) && categoryData[cat].has(res)===false){
            categoryData[cat] = new Set([...categoryData[cat],res]);
          }
         else{
            categoryData[cat]=new Set([res]);
          }
        });
      }
    }))
    setCatData(categoryData);
    return postIds;

  },
  {revalidateOnFocus: false,
  revalidateOnMount:true,
  revalidateOnReconnect: true,
  refreshWhenOffline: true,
  refreshWhenHidden: true,
  refreshInterval: 0});
  if(!data){
    return (
    <div style={{height:"fit-content",width:"fit-content",margin:"20px auto"}}>
        <BarLoader  color="#3675d6"  height={6} width={131} />
    </div>);
  }

   const getCatPost = async(cat)=>{
      const res = await axios.get(`${base_url}/api/categorys/getposts?catname=${cat}`);
      let posts =[];
      if(!res.data.result[0]?.postIds){
        setSpecificCat([]);
        return;
      }
      await Promise.all(res.data.result[0]?.postIds.map(async(id)=>{
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef,orderBy("date", "desc"), limit(10));
        if(docSnap.exists()){
          const res = docSnap.data();
          res.id= id;
          posts.push(res);
        }
      }))
      setSpecificCat(posts);
   }  

  return (   
    <>   
    <AnimatePresence>
      {explore===true && (
        <Explore setExplore={setExplore}/>
      )}
      </AnimatePresence>
      <div className={style.feedFrame}>
        <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div className={style.showCategory}>
          <span onClick={()=>setCategory("All")} style={{backgroundColor:category==='All'?"#929AAB":"transparent",color:category==='All'?"#F7F7F7":"#393E46"}}>All</span>
            {
              user.categoryId.map((cat,index)=>(
                  <span onClick={()=>{setCategory(cat); getCatPost(cat)}}  style={{backgroundColor:cat!==category?"transparent":"#929AAB",color:cat!==category?"#393E46":"#F7F7F7"}} key={index+"cat"} >{cat}</span>
              ))
            }
        </div>
          <img src={'/images/explore.png'} style={{height:"20px",marginRight:"10px",cursor:"pointer"}} onClick={()=>setExplore(true)}></img>
        </div>
    
        {
          category==="All"?(
            data.map((post,idx)=>(
              <Post key={"post"+idx} post={post}/>
            ))
          ):(
            specificCat.map((post,idx)=>(
              <Post key={"post"+idx} post={post}/>
            ))
          )
          
        }
      </div>
      </>
  )
}

export default Feed;