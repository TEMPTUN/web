import React, { useEffect, useState } from "react";
import style from './Index.module.scss';
import PostalModal from "./PostalModal";
import {useSelector} from 'react-redux';
import Feed from './Feed'

function Index() {
	const [showModal, setShowModal] = useState("close");
  	const user = useSelector((state)=>state.user);
	
	const clickHandler = (event) => {
		event.preventDefault();
		switch (showModal) {
			case "open":
				setShowModal("close");
				break;
			case "close":
				setShowModal("open");
				break;
			default:
				setShowModal("close");
				break;
		}
	};

	
	 
	return (
    <>
      <div className={style.Container}>
			<div className={style.startPost} onClick={clickHandler}> 
				<img src={'/images/send.png'}></img>
			</div>
			<PostalModal showModal={showModal} clickHandler={clickHandler} />
			<Feed/>
		</div>
    </>
		
	);
}

 
export default Index;