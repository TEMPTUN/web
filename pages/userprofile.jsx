import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

const Experience  = ()=>{
  const {register,handleSubmit,formState: { errors }} = useForm();
  const exper = async(data)=>{
    console.log(data);
  }
  return (
    <div>
        <form onSubmit={()=>handleSubmit(exper)}>
          <input type="text" placeholder="company name" {...register("companyname")}></input>
          <input type="text" placeholder="position" {...register("position")}></input>
          <select {...register("emplotype")}>
            <option value="fulltime" >Full Time</option>
            <option value="parttime">Part Time</option>
            <option value="freelance">Freelance</option>
            <option value="internship">Internship</option>
          </select>
          <input type="text" placeholder="start year" {...register("startyear")}></input>
          <input type="text" placeholder="end year" {...register("endyear")}></input>
          <button type='submit'>add</button>
        </form>
    </div>
  )
}

const Education = ()=>{
  const {register,handleSubmit,formState: { errors }} = useForm();
  const educ=async(data)=>{
    console.log(data);
  }
  return (
    <div>
        <form onSubmit={()=>handleSubmit(educ)}>
          <input type="text" placeholder="school name" {...register("schoolname")}></input>
          <input type="text" placeholder="degree" {...register("degree")}></input>
          <input type="text" placeholder="start year" {...register("startyear")}></input>
          <input type="text" placeholder="end year" {...register("endyear")}></input>
          <button type='submit'>add</button>
        </form>
    </div>
  )
}

const Skill = ()=>{
  return (
    <div>Skill</div>
  )
}

const Project = ()=>{
  return (
    <div>Project</div>
  )
}

const Link = ()=>{
  const {register,handleSubmit,formState: { errors }} = useForm();
  const onsubmit = async(e,data)=>{
    e.preventDefault();
    console.log(data);
  }
  return (
    <div>
      <form onSubmit={(e)=>{handleSubmit(e,onsubmit)}}>
        <input type="text" placeholder="github link" {...register("github")}></input>
        <input type="text" placeholder="linkedin link" {...register("linkedin")}></input>
        <input type="text" placeholder="instagram link" {...register("instagram")}></input>
        <button type='submit'>add</button>
      </form>
    </div>
  )
}


const userprofile = () => {
  const [exper,setexper] = useState(false);
  
  const {register,handleSubmit,formState: { errors }} = useForm();
  const handleexpert = (e)=>{
    console.log(e);
    // if(e==="experince"){
    //   setexperience(!exper);
    // }
    // else if(e==="education"){
    //   seteducation(!exper);
    // }
    // else if(e==="Skills"){
    //   setskill(!exper);
    // }
    // else if(e==="projects"){
    //   setproject(!exper);
    // }
    // else if(e==="links"){
    //   setlink(!exper);
    // }
  } 
  const onSubmit = async(e,data) => {
    e.preventDefault();
    console.log(data);
  }
  return (
    <div>
         
        <form onSubmit={()=>handleSubmit(e,onSubmit)}>
            <input type="text" placeholder="name" {...register("name",{required: true})}></input>
            <input type="text" placeholder="email" {...register("email",{required: true})}></input>
            <input type="text" placeholder="headline" {...register("headline")}></input>
            <input type="text" placeholder='location' {...register("location")}></input>
            <button type='submit'>submit</button>
        </form>
        {/* <div>
            <h3>Experience</h3>
            <label onClick={()=>handleexpert("experince")}>+</label>
            {experience && <Experience/>}
        </div>
        <div>
            <h3>Education</h3>
            <label onClick={()=>handleexpert("education")}>+</label>
            {education && <Education/>}
        </div>
        <div>
            <h3>Skills</h3>
            <label onClick={()=>handleexpert("Skills")}>+</label>
            {skill && <Skill/>}
        </div>
        <div>
            <h3>Projects</h3>
            <label onClick={()=>handleexpert("projects")}>+</label>
            {project && <Project/>}
        </div>
      <div>
          <h3>Links</h3>
          <label onClick={()=>handleexpert("links")}>+</label>
          {link && <Link/>} */}
      {/* </div> */}
    </div>
  )
}

export default userprofile