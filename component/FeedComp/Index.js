import React from 'react'
import style from './Index.module.scss'

const Index = () => {
  const user = useSelector((state)=>state.user);
  return (
    <>
        <div className={style.head}>Header</div>
        <div className={style.ShareBox}>
          <div>
            {user.photoURL ? <img src={props.user.photoURL} alt="" /> : <img src="/images/user.svg" alt="" />}
            <button onClick={clickHandler} disabled={props.loading ? true : false}>
              Start a post
            </button>
          </div>
          <div>
            <button>
              <img src="/images/photo-icon.svg" alt="" />
              <span>Photo</span>
            </button>
            <button>
              <img src="/images/video-icon.svg" alt="" />
              <span>Video</span>
            </button>
            <button>
              <img src="/images/event-icon.svg" alt="" />
              <span>Event</span>
            </button>
            <button>
              <img src="/images/article-icon.svg" alt="" />
              <span>Write article</span>
            </button>
          </div>
			</div>
    </>
   

    
  )
}

export default Index