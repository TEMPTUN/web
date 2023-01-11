import React, { useEffect, useState } from 'react'
import {allCategory} from './category_data'
import styles from "./category.module.scss"
import base_url from '../../utils/connection';
import axios from 'axios';
import { useRouter } from 'next/router';
import { updateCategory } from '../../redux_feature/UserInfo/userSlice';
import {useDispatch } from 'react-redux';


function Category_selection() {
  const [text,setText] = useState("");
  const [selected,setSelected] = useState([]);
  const [options,setOptions] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleText = (e)=>{
    let t = e.target.value.toLowerCase()
    setText(t);
  }
  const handleClick = (e,data)=>{
    let flag= false;
    selected.map((d)=>{
      if(d===data){
         flag = true;
        return;
      }
    })
    flag===false && setSelected([...selected,data]);
  }

  const handleDelete = (e,data)=>{
    let arr=[];
    selected.map((d)=>{
      if(d!==data){
        arr.push(d);
      }
    })
    setSelected(arr);

  }
  
  const handleSubmit = async()=>{
    const Id=localStorage.getItem("userId");
    const url =`${base_url}/api/details/user`;
    try{
      const res=await axios.put(url,{
                      selectedCats:selected,
                      id:Id });
      dispatch(updateCategory(selected))
      router.push("/feed");
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    let arr=[];
    allCategory.map((data)=>{
      let str = data.toLowerCase();
      if(str.search(text)!==-1){
        arr.push(str);
      }
    })
    setOptions(arr);
  },[text])

  return (
    <>
        <h1>category_selection</h1>
        <input className={styles.ipt} type="text" value={text} onChange={(e)=>handleText(e)}/>

        <div className={styles.box} style={{marginBottom:"10px"}}>  

          {selected.map((user ,idx) => (
             <div className={styles.option}>
             <span   key={`${idx}+${user}`} onClick={(e)=>handleClick(e,user)}>{user}</span>
             <span  key={`${idx}+${user}+x`}  style={{marginLeft:"10px"}} onClick={(e)=>handleDelete(e,user)}>X</span>
           </div>
          ))}
        </div>

        <div className={styles.box}>  

        {options.map((user ,idx) => (
         <div className={styles.option}  key={`${idx}+${user}`} onClick={(e)=>handleClick(e,user)}>{user}</div>
         
        ))}
        </div>
        <button onClick={(e)=>handleSubmit(e)}>submit</button>
    </>
    
  )
}

export default Category_selection