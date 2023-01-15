import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router'
import Index from '../component/FeedComp/Index';
import Footer from '../component/FooterComp/Footer';

const feed = () => {
    // const Userid = useSelector((state)=>state.user._id);
  return (
    <>
      <Index/>
      <Footer/>
    </>
  )
}

export default feed