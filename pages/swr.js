import React from 'react'
import useSWR  from 'swr';
import base_url from '../utils/connection';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Footer from '../component/FooterComp/Footer';

const swr = () => {
 const user = useSelector((state)=>state.user);
 const {data,error} = useSWR(`${base_url}/api/details/user`,async()=>{
    let arr=[];
    await Promise.all(user.friendId.map(async(id)=>{
        const res = await axios.get(`${base_url}/api/details/user?id=${id}&other=allPostsId`);
        arr.push(...res.data.result.PostId);
        return arr;
    }))
 });
  // { refreshInterval: 1000 }
//  if(!data){
//     return <>Loading...</>
//  }
  return (
    <>
        {console.log(data)}
        {data && data.map((d,idx)=>(
            <div key={idx+"d"}>{d.name}</div>
        ))}
        {!data && <>loading...</>}
        <Footer/>
            
    </>
  )
}

export default swr