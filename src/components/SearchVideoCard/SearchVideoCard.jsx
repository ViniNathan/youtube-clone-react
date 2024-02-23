import React from 'react'
import Thumbnail from '../../assets/thumbnail1.png'
import ChannelImg from '../../assets/user_profile.jpg'
import './searchVideoCard.css'

const SearchVideoCard = () => {
  return (
    <div className="search-card">
      <div className="search-card__thumbnail">
        <img src={Thumbnail} alt="thumbnail" />
      </div>
      <div className="search-card__details">
        <h3>Título do vídeo</h3>
        <p>Views • Time</p>
        <div className="search-channel-details">
          <img src={ChannelImg} alt="" />
          <h3>Channel name</h3>
        </div>
        <p>Description</p>
      </div>
    </div>
  )
}

export default SearchVideoCard