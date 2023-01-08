import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import Category_selection from "../component/category/Category_selection";

function categories() {

  const router = useRouter();
  const Userid = useSelector((state)=>state.user.userId);
  
  return (
    <>
      {Userid===null && <p>Plz signup first</p>}
      {console.log(Userid)}
      <h1>{Userid}</h1>

        <Category_selection/>
    </>
   
  )
}

export default categories