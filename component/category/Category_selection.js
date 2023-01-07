import React, { useEffect, useState } from 'react'
import categoryData from './category_data'
import styles from "./category.module.scss"
import base_url from '../../utils/connection';
import axios from 'axios';


function Category_selection() {
  const [text,setText] = useState("");
  const [selected,setSelected] = useState([]);
  const [options,setOptions] = useState([]);

  const handleText = async(e)=>{
    let t = e.target.value.toLowerCase()
    await setText(t);
  }
  const handleClick = async(e,data)=>{
    await setSelected([...selected,data]);
  }
  
  const handleSubmit = async()=>{
    const Id=localStorage.getItem("userId");
    const url =`${base_url}/api/details/user`;
    try{
      const res=await axios.put(url,{
                      selectedCats:selected,
                      id:Id });
      console.log(res);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    let arr=[];
    categoryData.map((data)=>{
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
            <div className={styles.option}  key={`${idx}+${user}`} onClick={(e)=>handleClick(e,user)}>{user}</div>
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