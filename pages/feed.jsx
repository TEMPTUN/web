import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router'
  
const feed = () => {
    const Userid = useSelector((state)=>state.user._id);
  
  return (
    <div>
      <h1>welcome MY Friend {Userid}</h1>
    </div>
  )
}

export default feed