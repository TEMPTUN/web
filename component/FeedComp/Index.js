import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import style from './Index.module.scss';
import PostalModal from "./PostalModal";
import {useSelector} from 'react-redux';
import Feed from './Feed'

function Index(props) {
	const [showModal, setShowModal] = useState("close");
 
  const user = useSelector((state)=>state.user);


	const clickHandler = (event) => {
		event.preventDefault();
		if (event.target !== event.currentTarget) {
			return;
		}
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
			<div className={style.ShareBox}>
				<div>
					{user.profilePic ? <img src={user.profilePic} alt="" /> : <img src="/images/user.svg" alt="" />}
					<button onClick={clickHandler} >
						Start a post
					</button>
				</div>
			</div>
			<PostalModal showModal={showModal} clickHandler={clickHandler} />

			<Feed/>
		</div>
    </>
		
	);
}

 
export default Index;

 