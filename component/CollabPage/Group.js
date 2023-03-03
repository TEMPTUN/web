 import React from 'react'
import { useState } from 'react'
 import CreateGroup from './CreateGroup'
 import style from './style.module.scss'
 import { useSelector } from 'react-redux'
 import axios from 'axios';
 import base_url from '../../utils/connection'
 import useSWR from 'swr'
import Filter from './Filter'
import { BarLoader } from 'react-spinners';


 const Group = () => {
    const [open,setOpen] = useState(false);
    const user = useSelector((state)=>state.user);
    const [load,setLoad]=useState(true);

    const{data,error} = useSWR(user._id===null?null:`${base_url}/api/group/fetch`,async function fetcher(){
        let arr = new Set([]);
        await Promise.all(user.categoryId.map(async(cat)=>{
            const res = await axios.get(`${base_url}/api/categorys/updateCategories?category=${cat}&other=groupIds`);
            if(res.data.result.length!==0)
                if(res.data.result.length!==0)
                res.data.result[0]?.GroupsIds.map((ids)=>{
                    arr.add(ids)
                })
        }))
        let groupPost = [];
        await Promise.all(Array.from(arr).map(async(id)=>{
            const res= await axios.get(`${base_url}/api/group/fetch?id=${id}`);
            if(res.data.result!==null){
                groupPost.push(res.data.result);
            }
        }))
        return groupPost;
    },{revalidateOnFocus: false,
        revalidateOnMount:true,
        revalidateOnReconnect: true,
        refreshWhenOffline: true,
        refreshWhenHidden: true,
        refreshInterval: 0});
    if(error){
        console.log( error);
        return<>Error</>
    }
    
    if (!data) return 
    (setTimeout(()=>{
        setLoad(false);
      },1000)
    )
   return (
    <div className={style.groupFrame}> 
        { console.log(data)  }
        {load && 
        <div className={style.loader}>
          <BarLoader  color="#3675d6"  height={6} width={131} />
          <h3>Find your Complement</h3>
        </div>}
        <div className={style.createPost} onClick={()=>setOpen(true)}>Post</div>
        <Filter opt={"group"}/>
        {open===true && (<CreateGroup setOpen={setOpen}/>)}
         {data!==null && (
             <div style={{width:"95%",paddingBottom:"30px"}}>{
                data.map((d,ind)=>(
                    <div className={style.groupBox} key={ind+'gp'}>
                        <div className={style.head}>
                            <img src={d?.image}></img>
                            <div className={style.nameTitle}>
                                <h4 style={{marginBottom:"2px"}}>{d?.name}</h4>
                                <span>{d?.location}</span>
                            </div>
                            <h4 className={style.compensation}>{d?.Compensation}</h4>
                        </div>
                        <div className={style.body}>
                            <h2>{d?.title}</h2>
                            <p>{d?.description}</p>
                            <div>
                                <h2>About Group</h2>
                                <p>{d?.about}</p>
                            </div>
                            <p style={{fontWeight:"600"}}>Required Skills</p>
                            <div>
                            {
                                d?.category.map((cat,indx)=>(
                                    <span key={indx+"mc"}>{cat}</span>
                                ))
                            }
                            </div>     
                        </div>
                    </div>
                ))
            }
        </div>
        )}
    </div>
   )
 }
 
 export default Group