import React from 'react'
import user_profile from '../../assets/user_profile.jpg'
import { BiLike , BiDislike} from "react-icons/bi";
import { PiShareFatLight } from "react-icons/pi";
import './video.css'

const Video = () => {
  return (
    <div className="videopage-grid">
      <div className="video-screen"></div>
      <div className="video-title">Título do vídeo</div>
      <div className="video-channel"><img src={user_profile} alt="" /></div>
      <div className="channel-details">
        <h3>Nome do canal</h3>
        <p>Inscritos</p>
      </div>
      <button className='sub-btn'>Inscrever-se</button>
      <div className="btn-container">
      <button className='like'><BiLike/><p>Likes</p></button>
      <div className="separator"></div>
      <button className='dislike'><BiDislike/></button>
      </div>
      <button className='share'><PiShareFatLight className='share-icon'/><p>Compartilhar</p></button>

      <div className="related-videos">
        <div className="videos-card"></div>
      </div>

      <div className="comments-section">
        
      </div>
    </div>
  )
}

export default Video