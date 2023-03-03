
import React from 'react'
import { useForm } from 'react-hook-form';
import {useSelector,useDispatch } from 'react-redux';
import style from './style.module.scss';
import styled from "styled-components";
import { useState } from 'react';
import {category_Data,allCategory} from '../category/category_data';
import axios from 'axios';
import base_url from '../../utils/connection';

const CreateGroup = ({setOpen}) => {
    const user = useSelector((state)=>state.user);
    const {register,handleSubmit,formState: { errors }} = useForm();
    const [showCategory,setShowCategory] = useState(false);
    const [options,setOptions] = useState([]);
    const [domainCat,setDomainCat] = useState(category_Data["Academics"]);
	const [selectedCats,setselectedCats] = useState(new Set());
    const[toggle,setToggle] = useState(0);
    const[groupData,setGroupData] = useState("");

    const onSubmit = (data)=>{
        setGroupData(data);
        setShowCategory(true);
    }

    const reset =()=>{
      setGroupData("");
      setShowCategory(false);
      setselectedCats(new Set());
      setOpen(false);
    }
    const postGroup =  async()=>{
        reset();
        const payload = {
            userId:user._id,
            name:user.name,
            image:user.image,
            title:groupData.title,
            about:groupData.about,
            description:groupData.desc,
            Compensation:groupData.employment,            
            company:groupData.comp,
            location:groupData.loc,
            category:Array.from(selectedCats),
        }
        const res = await axios.post(`${base_url}/api/group/create`,payload);
        await axios.post(`${base_url}/api/categorys/updateCategories`,{category:payload.category,GroupIds:res.data.id});
    }

    const HandleMainCategory = ()=>{
		let arr=[];
		for(let x in category_Data){
			arr.push(x);
		}
		return(
			<>	
				{arr.map((data,idx)=>(
					<button key={idx} style={{backgroundColor:toggle===idx?"green":"white"}} onClick={()=>{setDomainCat(category_Data[data]),setToggle(idx)}}>{data}</button>
				))}
			</>
		)
	}
    const HandleSubCategories = ()=>{
        return(
           <>	
               {domainCat.map((data,idx)=>(
                   <button key={idx} style={{backgroundColor:selectedCats.has(data.toLowerCase())?"blue":"white"}}onClick={()=>handleCatClick(data)}>{data}</button>
               ))}
           </>
       )
   }
   const handleCatClick = (data)=>{
       setselectedCats(previousState => new Set([...previousState, data.toLowerCase()]));
   }
   const handleSearch = (e)=>{
    const  text = e.target.value.toLowerCase();
    if(text.length===0){
        setOptions([]); 
        return;
    }
    let arr=[];
    allCategory.map((data)=>{
    let str = data.toLowerCase();
    if(str.search(text)!==-1){
        arr.push(str);
    }})
    setOptions(arr); 
    console.log(options)
}


    const Select = React.forwardRef(({ onChange, name, label }, ref) => (
        <>
          <label>{label}</label>
          <select name={name} ref={ref} onChange={onChange}>
            <option value="Paid">Paid</option>
            <option value="Equity">Equity</option>
            <option value="Revenue split">Revenue split</option>
            <option value="Volunteer">Volunteer</option>
          </select>
        </>
      ));

  return (
    <div className={style.frame}>
        <div className={style.basicIntro}>
            <img src={user.image}></img>
            <span>{user.name}</span>
            <button onClick={(event) => reset(event)}>
							<img src="/images/close-icon.svg" alt="" />
						</button>
        </div>
        {showCategory===false  &&(
             <form className={style.Gform} onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
             <div className={style.box}>
                 <label>
                     Title:
                     <input type="text" name="title" {...register("title",{required: true})} placeholder="Co-founder OR Web-Developer" />
                     {errors.name && errors.name.type === "required" && (
                     <p className="errorMsg">Title is required.</p>
                     )}
                 </label>
             </div>
             <div className={style.box}>
             <label>
                 About Group:
                 <input type="text" name="about" {...register("about",{required: true})} placeholder="About your organisation/group" />
                 {errors.name && errors.name.type === "required" && (
                 <p className="errorMsg">About is required.</p>
                 )}
             </label>
             </div>
             <div className={style.box}>
             <label>
                 Description for the Post:
                 <input type="text" name="desc" {...register("desc",{required: true})} placeholder="Responsibilites" />
                 {errors.name && errors.name.type === "required" && (
                 <p className="errorMsg">Description is required.</p>
                 )}
             </label>
             </div>
             <div className={style.box}>
             <Select label="Compensation Type" {...register("employment")} />
             </div>
             <div className={style.box}>
             </div>
             <div className={style.box}>
             <label>
             Company Name(Optional):
                 <input type="text" name="comp" {...register("comp",{required: true})} placeholder="Place where you work" />
             </label>
             <label>
             Based In:
                 <input type="text" name="loc" {...register("loc",{required: true})} placeholder="location based in" />
             </label>
             </div>
             <input className={style.submit} type="submit" value="Next" />
         </form>
        )}
        {
            showCategory===true && (
                <Container>
				<Content>
					<Header>
						<h2>Selected Categories...</h2>
						<button onClick={(event) => reset(event)}>
							<img src="/images/close-icon.svg" alt="" />
						</button>
					</Header>

					<CategorySection>
						<input type='text'placeholder="Search your category" onChange={(e)=>handleSearch(e)}/>
						
						{options.length>=1 && 
						<Option>{
							options.map((data,idx)=>(
								<>
									<button key={idx} style={{backgroundColor:selectedCats.has(data)?"blue":"white"}}onClick={()=>handleCatClick(data)}>{data}</button>
								</>
							))	
						}
						</Option>}
						<Categories>
							  <HandleMainCategory/>
						</Categories>
						<SubCategory>
							 <HandleSubCategories/>
						</SubCategory>
					</CategorySection>

					<ShareCreation>
						<PostButton  disabled={selectedCats.length>0? true : false}  onClick={(event) => postGroup(event)}>
							Post
						</PostButton>
					</ShareCreation>
				</Content>
			</Container>	
            )
        }


    </div>
  )
}

export default CreateGroup

const Container = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 11;
	background-color: rgba(0, 0, 0, 0.8);
	animation: fadeIn 0.3s ease;
`;

const Content = styled.div`
	width: 100%;
	max-width: 552px;
	max-height: 90%;
	background-color: #fff;
	overflow: initial;
	border-radius: 5px;
	position: relative;
	display: flex;
	flex-direction: column;
	top: 32px;
	margin: 0 auto;
`;

const Header = styled.div`
	display: block;
	padding: 10px 20px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.15);
	font-size: 20px;
	line-height: 1.5;
	color: rgba(0, 0, 0, 0.9);
	display: flex;
	justify-content: space-between;
	align-items: center;
	h2 {
		font-weight: 400;
	}
	button {
		width: 40px;
		height: 40px;
		min-width: auto;
		border: none;
		outline: none;
		background: transparent;
		img,
		svg {
			pointer-events: none;
		}
	}
`;

const CategorySection = styled.div`
	position:relative;
	height:80vh;
	width:100%;
	border:1px solid grey;
	display:flex;
	flex-direction:column;
	align-items:center;
	input{
		padding-left:20px;
		margin-top:10px;
		height:10%;
		width:70%;
		border-radius:30px;
		border:0.3px solid grey;
	}
`;
const Option = styled.div`
top:14%;
z-index:3;
background-color:white;
position:absolute;
height:fit-content;
width:90%;
border:1px solid red;
display:flex;
flex-wrap:wrap;
button{
    height:12%;
    width:fit-content;
    min-width:15%;
    padding:2px;
    background:#e6e5e5;
    margin:10px;
}

`;
const Categories = styled.div`
margin-top:10px;
height:15%;
width:90%;
border:1px solid grey;
display:flex;
align-items:center;
overflow:scroll;
::-webkit-scrollbar {
width: 0px;
height:0px;
background: transparent;
}
button{
height:70%;
padding:10px;
border-radius:10px;
margin:0px 5px;
background:transparent;
cursor:pointer;
border:1px solid grey
}
`;
const SubCategory = styled.div`
height:80%;
width:100%;
border:1px solid red;
display:flex;
justify-content:space-evenly;
flex-wrap:wrap;

button{
height:12%;
width:fit-content;
min-width:15%;
padding:2px;
background:#e6e5e5;
margin:10px;
}
`;

const ShareCreation = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 10px 24px 10px 16px;
`;

const PostButton = styled.button`
	min-width: 60px;
	padding: 0 16px;
	border-radius: 20px;
	background: ${(props) => (props.disabled ? "#b8b8b8" : "#0a66c2")};
	color: ${(props) => (props.disabled ? "#5a5a5a" : "#fff")};
	font-size: 16px;
	letter-spacing: 1.1px;
	border: none;
	outline: none;
	&:hover {
		background: ${(props) => (props.disabled ? "#b8b8b8" : "#004182")};
	}
`;