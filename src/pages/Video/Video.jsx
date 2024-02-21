import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BiLike, BiDislike } from 'react-icons/bi';
import { PiShareFatLight } from 'react-icons/pi';
import user_profile from '../../assets/user_profile.jpg';
import './video.css';

const Video = () => {
  const [videoDetails, setVideoDetails] = useState(null);
  const { videoId } = useParams(); // Obtém o videoId da URL

  useEffect(() => {
    const fetchVideoDetails = async () => {
      const options = {
        method: 'GET',
        url: `https://yt-api.p.rapidapi.com/video/info?id=${videoId}`,
        headers: {
          'X-RapidAPI-Key': '4373c0479dmshd60398751fc667cp1a0de0jsne460c0931c68',
          'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setVideoDetails(response.data);
      } catch (error) {
        console.error('Erro ao buscar os detalhes do vídeo:', error);
      }
    };

    fetchVideoDetails();
  }, [videoId]);

  return (
    <div className="videopage-grid">
      {videoDetails ? (
        <>
          <div className="video-screen"></div>
          <div className="video-title">{videoDetails.title}</div>
          <div className="video-channel">
            <img src={user_profile} alt="" />
          </div>
          <div className="channel-details">
            <h3>{videoDetails.channelTitle}</h3>
            <p>Inscritos:</p>
          </div>
          <button className="sub-btn">Inscrever-se</button>
          <div className="btn-container">
            <button className="like">
              <BiLike />
              <p>Likes</p>
            </button>
            <div className="separator"></div>
            <button className="dislike">
              <BiDislike />
            </button>
          </div>
          <button className="share">
            <PiShareFatLight className="share-icon" />
            <p>Compartilhar</p>
          </button>

          <div className="related-videos">
            <div className="videos-card"></div>
          </div>

          <div className="comments-section"></div>
        </>
      ) : (
        <p className='loading'>Carregando...</p>
      )}
    </div>
  );
};

export default Video;
