import React from 'react'
import { useForm } from 'react-hook-form'
import { useState ,useEffect} from 'react'
import { useSelector } from 'react-redux';
import style from '../styles/updateProfile.module.scss';
import axios from 'axios';
const base_url = process.env.NEXT_PUBLIC_URL;
import { motion } from 'framer-motion';
import { StyleRegistry } from 'styled-jsx';
import Index from '../component/UserProfileComp/Index';

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
  return (
    
    <Index/>
  )
}

export default userprofile
 
 