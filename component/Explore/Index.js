import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux';
const base_url = process.env.NEXT_PUBLIC_URL;
import style from './Explore.module.scss';
import useSWR from 'swr';
import { Autocomplete,TextField } from '@mui/material';
import { allCategory } from '../category/category_data';

const Index = () => {  
  const user = useSelector((state)=>state.user);
  const[collabed,setCollabed] = useState(new Set());
  const[name,setName] = useState([]);

  const {data,error} = useSWR(user._id===null?null:`${base_url}/api/details/user?ther=allFriendsId`,async function fetcher(){
      let arr= new Set([]);
      await Promise.all(user.categoryId.map(async(cat)=>{
          const res = await axios.get(`${base_url}/api/categorys/updateCategories?category=${cat}&other=friendId`);
          res.data.result[0]?.userId.map((id)=>{
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
      return allUser;
  })
  
  if(error){
  return <h1>{error.message}</h1>
  }

  if(!data){
    return <h1>Loading....</h1>
  }

  const getname = async(str)=>{
    try{
      let searchname=str.replace(/ /g,"");
      let url=`${base_url}/api/search/auto?name=${searchname}`;
      let {data}=await axios.get(url);
      return data.result;
    }catch(err){
      console.log("--------------------getname---------------------");
      console.log(err);
    }
  }
  
  const onchange = async(e)=>{
    let str=e.target.value;
    let result=await getname(str);
    setName(result);
  }

  const handleCollab = async(id)=>{
    try{
      if(collabed.has(id)===false){
        console.log(id);
        await axios.put(`${base_url}/api/details/user`,{id:user._id,friendId:id});  //check it from here
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
      <div className={style.block}>
        <h1>Explore</h1>
        {/* <input type="text" placeholder='Search' id="combo"></input> */}
        <div className={style.block}>
          <Autocomplete
            freeSolo
            sx={{  width: 300 }}
            onChange={(e, value) => console.log(value)}
            options={name? name.map((option) => option.name) : ""}
            renderInput={(params) => <TextField {...params} label="Search" onChange={(e) => onchange(e)}/>}
          />
        </div>
        <div className={style.options}>
          <select placeholder='Categories'>
            <option value="all">All</option>
            {
                allCategory.map((cat,idx)=>(
                  <option value={cat} key={"idx@"+cat}>{cat}</option>
                ))
            }
             
          </select>
           <p>Filter</p>
        </div>
      </div>
      <div className={style.block2}>
        <div className={style.userCont}>
          {
            data.map((sug,idx)=>{
              if(sug===undefined){
                return <></>;
              }
              return (
                <div key={idx+"sug"} className={style.box}>
                  {console.log(sug)}
                  <div className={style.info}>
                    <div className={style.info2}>
                      <div style={{alignItems: "center"}}><img src={'images/user.svg'}></img></div>
                      <div style={{flexDirection:"column"}}>
                        <h2 style={{margin:"3px 7px"}}>{sug?.name}</h2>
                        <p style={{margin:"0px 7px"}}>Mohali,punjab</p>
                      </div>
                      <div style={{position:"absolute",right:"10px",alignItems: "center"}}><button>msg</button></div>
                    </div>
                    <div className={style.info3}>
                      <p>Ml learner working | web</p>
                      <h6>Talk to me about</h6>
                      <div><span>Java</span> <span>Java</span>
                      <span>Java</span><span>Java</span></div>
                    </div>
                  </div>
                  {!collabed.has(sug?._id) && <button onClick={(e)=>handleCollab(sug?._id)}>Collab</button>}
                  {collabed.has(sug?._id) && <button>Friends</button>}  
                </div>
              )  
            })
          }
        </div>
      </div>
    </div>
  )
}
export default Index;
