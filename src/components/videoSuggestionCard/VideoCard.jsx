import React from 'react'
import thumbTeste from '../../assets/thumbnail1.png'
import './videoCard.css'

const VideoCard = () => {
  return (
    <div className="video-suggest-card">
        <div className="video-suggest-thumb">
            <img src={thumbTeste} alt="thumb" />
        </div>
        <div className="video-length"><p>05:00</p></div>
        <div className="video-suggest-title">Título muito grande gigante lorem</div>
        <div className="suggest-details">
            <p>Canal</p>
            <p>Visualizações • Tempo</p>
        </div>
    </div>
  )
}

export default VideoCard