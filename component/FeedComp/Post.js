import React from 'react'
import style from './Index.module.scss'
import ReactPlayer from 'react-player'

const Post = ({post}) => {
  return (
    <div className={style.feed}>
        <div className={style.info}>
            <img src={post.image}></img>
            <h3>{post.name}</h3>
        </div>
        {
        (post.url || post.media) && (
            <div className={style.media}>
                {post.url && <ReactPlayer  className="react-player" playing={true} controls={true} width={"100%"} url={post.url}/>}
                {post.media && ReactPlayer.canPlay(post.media)===false && <img src={ post.media} alt="" />}
                {post.media && ReactPlayer.canPlay(post.media) && <ReactPlayer  className="react-player" onClick={()=>{console.log("video")}} playing={true} controls={true} width={"100%"} url={post.media} />}
            </div>
        )}
        <div className={style.social}>
            <img src={'/images/like.svg'}></img>
            <img src="/images/comment-icon.svg" alt="" />
        </div>
        <div className={style.description}>{post.description}</div>
  </div>
  )
}

export default Post