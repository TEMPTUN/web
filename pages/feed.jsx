import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router'
import Index from '../component/FeedComp/Index' 

const feed = () => {
    // const Userid = useSelector((state)=>state.user._id);
  return (
    <>
    <Index/>
    {/* <Write/> */}
    </>
  )
}

export default feed