import React from 'react'
import { Link } from 'react-router-dom' 
import './videoCard.css'

const VideoCard = ({thumb, time, channelTitle ,videoTitle, views, videoId, channelId, publishedTimeText, isLiveContent, channelHandle}) => {

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
    <Link to ={`../video/${videoId}`}>
      <div className="video-suggest-card">
        <div className="video-suggest-thumb">
          <img src={thumb} alt="thumb" />
        </div>
        <div className="video-length"><p>{time}</p></div>
        <div className="video-suggest-title">
          <div>{truncateString(videoTitle, 9)}</div>
        </div>
        <div className="suggest-details">
          <a href ={`https://youtube.com/${channelHandle ? channelHandle : channelId}`}>
            <p>{truncateString(channelTitle, 3)}</p>
          </a>
          <p>{views} • {checkLive(isLiveContent)}</p>
        </div>
      </div>
    </Link>
  )
}

export default VideoCard