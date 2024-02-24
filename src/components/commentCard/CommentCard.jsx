import React from 'react'
import { BiLike, BiDislike } from 'react-icons/bi';
import './commentCard.css'

const CommentCard = ({authorText, authorThumbnail, textDisplay, publishedTimeText}) => {
  return (
    <div className="comment-card">
        <div className="profile-img">
            <img src={authorThumbnail} alt="" />
        </div>
        <div className="comment-details">
            <div className="profile-title">
                <p>{authorText}</p>
                <p>{publishedTimeText}</p>
            </div>
            <div className="comment-text">
                <p>{textDisplay}</p>
            </div>
            <div className="comment-actions">
                <BiLike className='c-icon'/>
                <p>{likesCount}</p>
                <BiDislike className='c-icon'/>
            </div>
        </div>
    </div>
  )
}

export default CommentCard