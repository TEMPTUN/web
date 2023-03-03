import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import Category_selection from "../component/category/Category_selection";

function categories() {
  
  return (
    <>
        <Category_selection/>
    </>
   
  )
}

export default categories