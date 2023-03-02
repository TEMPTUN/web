import React from 'react'
import style from './profile.module.scss';
import { motion,AnimatePresence } from 'framer-motion';

const CompSection = ({data})=>{
    return(
        <div className={style.compCont}>
            <div className={style.compImg}></div>
            <div className={style.compInfo}> 
                <h3 style={{}}>Company</h3>
                <h5>SDE INTERN</h5>
                <p>Internship, Nov 2022-Dec 2022</p>
            </div>
        </div>
    )
}

const SchoolSection = ({data})=>{
    return(
        <div className={style.compCont}>
            <div className={style.compImg}></div>
            <div className={style.compInfo}> 
                <h3 style={{}}>Central Academy School</h3>
                <h5>12th </h5>
                <p>Nov 2021-Dec 2022</p>
            </div>
        </div>
    )
}

const ProjectSection = ({data})=>{
    return(
        <div className={style.ProjCont}>
            <div  style={{width:"100%",height:"120px",border:"1px solid green"}} className={style.projImg}></div>
            <div className={style.ProjInfo}> 
                <h3>Title</h3>
                <p>Description</p>
            </div>
        </div>
    )
}

const LinkSection = ({data})=>{
    return(
        <div className={style.LinkCont}>
            <p>Codechef</p>
            <p>Leetcode</p>
        </div>
    )
}


const About = () => {
  return (
    <div className={style.optionContainer}>
        <div className={style.Sec}>
            <h2>About</h2>
            <p>my self doidehf pijwd fodejf pidwjf piwd jfpiipeifjfi pewifhohfp fpoidwhfdwpif i9pfuepife poiwf hepwjh pefij pwfj poj f pifj rp</p>
        </div>
        <div className={style.Sec}>
            <h2>Experince</h2>
            <CompSection/>
            <div className={style.seprate}></div>
            <CompSection/>
        </div>
        <div className={style.Sec}>
            <h2>Education</h2>
            <SchoolSection/>
            <SchoolSection/>
        </div>
        <div className={style.Sec}>
            <h2>Projects</h2>
            <ProjectSection/>
            <ProjectSection/>
        </div>
        <div className={style.Sec}>
            <h2>Skills</h2>
            <div className={style.skillCont}>
                <motion.p whileHover={{scale:"1.1"}} transition={{type: "tween",duration:"1.5"}}>Java</motion.p>
                <p>Java</p>
                <p>Java</p>
                <p>Java</p>
                <p>Java</p>
                <p>Java</p>
            </div>
        </div>
        <div className={style.Sec}>
            <h2>Interests</h2>
            <LinkSection/>
        </div>
    </div>
  )
}

export default About