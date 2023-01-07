import React, { useEffect, useState } from 'react'
import categoryData from './category_data'
import styles from "./category.module.scss"



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

  useEffect(()=>{
    let arr=[];
    console.log(text);
    categoryData.map((data)=>{
      let str = data.toLowerCase();
      // console.log(str.search(text));
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
    </>
    
  )
}

export default Category_selection