import React from 'react'
import { Link } from 'react-router-dom' 
import './searchVideoCard.css'

const SearchVideoCard = ({thumb, time, channelTitle, channelImg ,videoTitle, views, videoDescription, videoId, channelId}) => {
  return (
    <div className="search-card">
      <Link to ={`../video/${videoId}`} className="search-card__thumbnail">
        <img src={thumb} alt="thumbnail" />
      </Link>
      <div className="search-card__details">
        <Link to ={`../video/${videoId}`}>{videoTitle}</Link>
        <p>{views} visualizações • {time}</p>
        <a href={`https://youtube.com/${channelId}`} className="search-channel-details" target='_blank'>
          <img src={channelImg} alt="" />
          <p className='channel-name'>{channelTitle}</p>
        </a>
        <p>{videoDescription}</p>
      </div>
    </div>
  )
}

export default SearchVideoCard