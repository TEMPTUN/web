import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import style from '../styles/updateProfile.module.scss';
import axios from 'axios';
import base_url from '../utils/connection';
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
    <div className={style.updateFrame}>
        <form onSubmit={handleSubmit(experience)}>
          <input type="text" placeholder="company name" {...register("companyname")}></input>
          <input type="text" placeholder="position" {...register("position")}></input>
          <select {...register("emplotype")}>
            <option value="fulltime" >Full Time</option>
            <option value="parttime">Part Time</option>
            <option value="freelance">Freelance</option>
            <option value="internship">Internship</option>
          </select>
          <input type="text" placeholder="start year" {...register("experstartyear")}></input>
          <input type="text" placeholder="end year" {...register("experendyear")}></input>
          <button type='submit'>add</button>
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
    <div>
        <form onSubmit={handleSubmit(educ)}>
          <input type="text" placeholder="school name" {...register("schoolname")}></input>
          <input type="text" placeholder="degree" {...register("degree")}></input>
          <input type="text" placeholder="start year" {...register("edustartyear")}></input>
          <input type="text" placeholder="end year" {...register("eduendyear")}></input>
          <button type='submit'>add</button>
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
    <form onSubmit={handleSubmit(onsubmit)}>
      <input type="text" placeholder="skill" {...register("skill")}></input>
      <button type='submit'>add</button>
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
        {link:data.link,description:data.desc},
      ]
    }))
    setForm("");
  }
  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <input type="text" placeholder="title" {...register("title")}></input>
      <input type="text" placeholder="Description" {...register("description")}></input>
      <input type="text" placeholder="link" {...register("projectlink")}></input>
      <button type='submit'>add</button>
    </form>
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

    <form onSubmit={handleSubmit(onsubmit)}>
      <input type="text" placeholder="Platform" {...register("platform")}></input>
      <input type="text" placeholder="link" {...register("link")}></input>
      <button type='submit'>add</button>
    </form>
    
  )
}


const userprofile = () => {
  const user = useSelector((state)=>state.user);
  const [form,setForm] = useState("");
  const [allData,setAllData] = useState({
    Personal:{},
    Experience:[],
    Education:[],
    Skill:[],
    Project:[],
    Links:[],
  });
  
  const {register,handleSubmit,formState: { errors }} = useForm(); 

  const onSubmit = async(data) => {
    setAllData((prev)=>({
      ...prev,
      Personal:{
         name:data.name,
          email:data.email,
          headline:data.headline,
      }
    }))
   // will get all DAta here
    console.log(allData)
    const res=await axios.put(`${base_url}/api/details/user`,{allData,id:user._id});
    console.log(res.data);
  }
  return (
    
    <div className={style.updateFrame}>
      {console.log(allData)}
        <form onSubmit={handleSubmit(onSubmit)} className={style.profileForm}>
            <div>
              {user.image===null && <img src={'/images/user.svg'}></img>}
              {user.image!==null && <img src={user.image}></img>}
              <label htmlfor="image">Upload</label>
              <input type="file" placeholder="image" id="image" {...register("image")} hidden></input>  
            </div>
            <div>
              <label for="name">Full Name</label>
              <input type="text" placeholder="name" id="name" {...register("name",{required: true})}></input>
            </div>
            <div>
              <label for="name">Email</label>
              <input type="text" placeholder="email" {...register("email",{required: true})}></input>
            </div>
            <div>
              <label for="name">HeadLine</label>
              <input type="text" placeholder="Ex: WEB DEVELOPER | DANCER | ACTOR" {...register("headline")}></input>           
            </div>
            <button type='submit' >submit</button>
        </form>
        <div>
          <h3>Experience</h3>
          <label onClick={()=>setForm("experience")}>+</label>
          {form==="experience" && <Experience setForm={setForm} setAllData={setAllData} allData={allData}/>}
        </div>
        <div>
            <h3>Education</h3>
            <label onClick={()=>setForm("education")}>+</label>
            {form==="education" && <Education setForm={setForm} setAllData={setAllData} allData={allData}/>}
        </div>
        <div>
            <h3>Skills</h3>
            <label onClick={()=>setForm("skill")} >+</label>
            {form==="skill" && <Skill setForm={setForm} setAllData={setAllData} allData={allData}/>}
        </div>
        <div>
            <h3>Projects</h3>
            <label onClick={()=>setForm("project")}>+</label>
            {form==="project" && <Project setForm={setForm} setAllData={setAllData} allData={allData}/>}
        </div>
      <div>
          <h3>Links</h3>
          <label onClick={()=>setForm("link")}>+</label>
          {form==="link" && <Link setForm={setForm} setAllData={setAllData } allData={allData}/>}
      </div>
    </div>
  )
}

export default userprofile
 
 