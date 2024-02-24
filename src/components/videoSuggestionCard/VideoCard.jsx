import React from 'react'
import { Link } from 'react-router-dom' 
import './videoCard.css'

const VideoCard = ({thumb, time, channelTitle ,videoTitle, views, videoId, channelId, publishedTimeText, isLiveContent}) => {

  const truncateString = (title, maxWords) => {
    const words = title.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    } else {
      return title;
    }
  };

  const checkLive = (isLiveContent) => {
    if (isLiveContent === true) {
      return "Ao vivo"
    } else {
      return publishedTimeText
    }
  }

  return (
    <div className="video-suggest-card">
        <Link to ={`../video/${videoId}`} className="video-suggest-thumb">
          <img src={thumb} alt="thumb" />
        </Link>
        <div className="video-length"><p>{time}</p></div>
        <Link to ={`../video/${videoId}`} className="video-suggest-title">
          <div>{truncateString(videoTitle, 9)}</div>
        </Link>
        <div className="suggest-details">
            <p>{truncateString(channelTitle, 3)}</p>
            <p>{views} • {checkLive(isLiveContent)}</p>
        </div>
    </div>
  )
}

export default VideoCard