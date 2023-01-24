import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useEffect,useState } from 'react';
import { useRouter } from 'next/router'
import Index from '../component/FeedComp/Index';
import Footer from '../component/FooterComp/Footer';
import { base_url } from '../utils/connection';


const feed = () => {
  return (
    <>
      <Index />
      <Footer/>
    </>
  )
}

export default feed