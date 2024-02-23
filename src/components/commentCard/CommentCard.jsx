import React from 'react'
import userProfile from '../../assets/user_profile.jpg'
import { BiLike, BiDislike } from 'react-icons/bi';
import './commentCard.css'

const CommentCard = () => {
  return (
    <div className="comment-card">
        <div className="profile-img">
            <img src={userProfile} alt="" />
        </div>
        <div className="comment-details">
            <div className="profile-title">
                <p>Nome do Usuário</p>
                <p>Tempo</p>
            </div>
            <div className="comment-text">
                <p>Comentário do usuário</p>
            </div>
            <div className="comment-actions">
                <BiLike className='c-icon'/>
                <p>numero</p>
                <BiDislike className='c-icon'/>
            </div>
        </div>
    </div>
  )
}

export default CommentCard