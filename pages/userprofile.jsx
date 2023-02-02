import React from 'react'
import { useForm } from 'react-hook-form'
import { useState ,useEffect} from 'react'
import { useSelector } from 'react-redux';
import style from '../styles/updateProfile.module.scss';
import axios from 'axios';
import base_url from '../utils/connection';
import { motion } from 'framer-motion';
// import { useSelector } from 'react-redux';
// import style from 'styled-components';
// import axios from 'axios';

const Experience  = ({setForm,setAllData,allData})=>{
  const {register,handleSubmit,formState: { errors }} = useForm();
  const experience = async(data)=>{
    setForm("");
    setAllData((prev)=>({
      ...prev,
      Experience:[
        ...allData.Experience,
        data
      ]
    }))
  }
  return (
    <div className={style.experienceFrame}>
        <form onSubmit={handleSubmit(experience)}>
          <input style={{width:"100%"}} type="text" placeholder="company name" {...register("companyname")}></input>
          <input  style={{width:"60%"}} type="text" placeholder="position" {...register("position")}></input>
          <select {...register("emplotype")} style={{width:"35%",height:"40px",marginLeft:"10px"}}>
            <option value="fulltime" >Full Time</option>
            <option value="parttime">Part Time</option>
            <option value="freelance">Freelance</option>
            <option value="internship">Internship</option>
          </select>
          <input style={{width:"45%",height:"30px"}} type="text" placeholder="start year" {...register("edustartyear")}></input>
          <input style={{width:"45%",height:"30px",marginLeft:"20px"}} type="text" placeholder="end year" {...register("eduendyear")}></input>
          <button style={{width:"80%",margin:"auto"}} type='submit'>Add</button>
        </form>
    </div>
  )
}

const Education = ({setForm,setAllData,allData})=>{
  const {register,handleSubmit,formState: { errors }} = useForm();
  const educ=async(data)=>{
    setForm("");
    setAllData((prev)=>({
      ...prev,
      Education:[
        ...allData.Education,
        data
      ]
    }))
  }
  return (
    <div className={style.educationFrame}>
        <form onSubmit={handleSubmit(educ)}>
          <input style={{width:"100%"}} type="text" placeholder="school name" {...register("schoolname")}></input>
          <input style={{width:"100%"}} type="text" placeholder="degree" {...register("degree")}></input>
          <input style={{width:"45%",height:"30px"}} type="text" placeholder="start year" {...register("edustartyear")}></input>
          <input style={{width:"45%",height:"30px",marginLeft:"20px"}} type="text" placeholder="end year" {...register("eduendyear")}></input>
          <button style={{width:"80%"}} type='submit'>add</button>
        </form>
    </div>
  )
}

const Skill = ({setForm,setAllData,allData})=>{
  const {register,handleSubmit,formState: { errors }} = useForm();
  const onsubmit = (data)=>{
    if(data.skill===""){
      return;
    }
    setAllData((prev)=>({
      ...prev,
      Skill:[
        ...allData.Skill,
        data.skill,
      ]
    }))
    setForm("");
  }
  return (
    <form onSubmit={handleSubmit(onsubmit)} style={{width:"90%"}}>
      <input style={{width:"70%",height:"40px",padding:"4px"}}type="text" placeholder="skill" {...register("skill")}></input>
      <button  style={{width:"20%",height:"40px",margin:"5%"}}type='submit'>add</button>
    </form>
  )
}

const Project = ({setForm,setAllData,allData})=>{
  const {register,handleSubmit,formState: { errors }} = useForm();
   
  const onsubmit = (data)=>{
    if(data.link===""){
      return;
    }
    setAllData((prev)=>({
      ...prev,
      Project:[
        ...allData.Project,
        {title:data.title,description:data.desc,link:data.projectlink},
      ]
    }))
    setForm("");
  }
  return (
    <div className={style.projectFrame}>
    <form onSubmit={handleSubmit(onsubmit)} style={{width:"90%",display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
      <input style={{width:"100%",height:"40px"}}type="text" placeholder="title" {...register("title")}></input>
      <input  style={{width:"100%",height:"40px"}} type="text" placeholder="Description" {...register("description")}></input>
      <input  style={{width:"100%",height:"40px"}} type="text" placeholder="link" {...register("projectlink")}></input>
      <button style={{width:"50%"}}type='submit'>add</button>
    </form>
    </div>
  )
}

const Link = ({setForm,setAllData,allData})=>{ 
  const {register,handleSubmit,formState: { errors }} = useForm();
  const onsubmit = async(data)=>{
    if(data.link===""){
      return;
    }
    setAllData((prev)=>({
      ...prev,
      Links:[
        ...allData.Links,
        {platform:data.platform,
        link:data.link},
      ]
    }))
    setForm("");
    console.log(allData)
  }
  return (
    <div className={style.linkFrame}>
      <form onSubmit={handleSubmit(onsubmit)}>
      <input style={{width:"80%"}} type="text" placeholder="Platform" {...register("platform")}></input>
      <input style={{width:"80%"}} type="text" placeholder="link" {...register("link")}></input>
      <button  style={{width:"50%"}} type='submit'>add</button>
      </form>
    </div>
    
    
  )
}


const userprofile = () => {
  const user = useSelector((state)=>state.user);
  const [form,setForm] = useState("");
  const [allData,setAllData] = useState({
    Experience:[],
    Education:[],
    Skill:[],
    Project:[],
    Links:[],
  });
  
  const {register,handleSubmit,reset,formState: { errors }} = useForm(); 
  useEffect(() => {
    reset(user);
  }, [user])
  

  const onSubmit = async(data) => {
    console.log(allData)
    await axios.put(`${base_url}/api/details/user`,{allData,personal:data,id:user._id});
  }
  return (
    
    <div className={style.updateFrame}>
        <form onSubmit={handleSubmit(onSubmit)} className={style.profileForm}>
            <div>
              {user.image===null && <img src={'/images/user.svg'}></img>}
              {user.image!==null && <img src={user.image}></img>}
              <label htmlFor="image">Upload</label>
              <input type="file" placeholder="image" id="image" {...register("image")} hidden></input>  
            </div>
            <div>
              <label for="name">Full Name</label>
              <input type="text"  placeholder="name" id="name" {...register("name")}></input>
            </div>
            <div>
              <label for="name">Email</label>
              <input type="text" placeholder="email" {...register("email")}></input>
            </div>
            <div>
              <label for="name">HeadLine</label>
              <input type="text" placeholder="Ex: WEB DEVELOPER | DANCER | ACTOR" {...register("headline")}></input>           
            </div>
            <motion.button  whileTap={{scale:"0.8"}} transition={{type:"tween"}}  type='submit'>add</motion.button>
        </form>
        <div className={style.boxFrame}>
          <h3>Experience</h3>
          <span onClick={()=>{form==="experience"?setForm(""):setForm("experience")}}>+</span>
          {form==="experience" && <Experience setForm={setForm} setAllData={setAllData} allData={allData}/>}
        </div>
        <div className={style.boxFrame}>
            <h3>Education</h3>
            <span onClick={()=>{form==="education"?setForm(""):setForm("education")}}>+</span>
            {form==="education" && <Education setForm={setForm} setAllData={setAllData} allData={allData}/>}
        </div>
        <div className={style.boxFrame}>
            <h3>Skills</h3>
            <span onClick={()=>{form==="skill"?setForm(""):setForm("skill")}} >+</span>
            {form==="skill" && <Skill setForm={setForm} setAllData={setAllData} allData={allData}/>}
        </div>
        <div className={style.boxFrame}>
            <h3>Projects</h3>
            <span onClick={()=>{form==="project"?setForm(""):setForm("project")}}>+</span>
            {form==="project" && <Project setForm={setForm} setAllData={setAllData} allData={allData}/>}
        </div>
      <div className={style.boxFrame}>
          <h3>Links</h3>
          <span onClick={()=>{form==="link"?setForm(""):setForm("link")}}>+</span>
          {form==="link" && <Link setForm={setForm} setAllData={setAllData } allData={allData}/>}
      </div>
    </div>
  )
}

export default userprofile
 
 