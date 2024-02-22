import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BiLike, BiDislike } from 'react-icons/bi';
import { PiShareFatLight } from 'react-icons/pi';
import user_profile from '../../assets/user_profile.jpg';
import { fetchVideoDetails, fetchChannelDetails } from '../../utils/videoServiceApi';
import './video.css';

const Video = () => {
  const [videoDetails, setVideoDetails] = useState(null);
  const [channelDetails, setChannelDetails] = useState(null);
  const { videoId } = useParams(); // Obtém o videoId da URL

  useEffect(() => {
    const getVideoDetails = async () => {
      try {
        const videoData = await fetchVideoDetails(videoId);
        setVideoDetails(videoData);
        console.log(videoData);

        // Obtém os detalhes do canal usando o channelId do video
        const channelData = await fetchChannelDetails(videoData.channelId);
        setChannelDetails(channelData);
      } catch (error) {
        console.error('Erro ao buscar os detalhes do vídeo:', error);
      }
    };

    getVideoDetails();
  }, [videoId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
  };

  return (
    <div className="videopage-grid">
      {videoDetails && channelDetails ? (
        <>
          <div className="video-screen"></div>
          <div className="video-title">{videoDetails.title}</div>
          <div className="video-channel">
            <img src={user_profile} alt="" />
          </div>
          <div className="channel-details">
            <h3>{videoDetails.channelTitle}</h3>
            <p>{channelDetails.subscriberCountText} Inscritos</p>
          </div>
          <button className="sub-btn">Inscrever-se</button>
          <div className="btn-container">
            <button className="like">
              <BiLike />
              <p>{videoDetails.likeCount}</p>
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
          <div className="video-description">
          <h4>{videoDetails.viewCount} Visualizações {formatDate(videoDetails.publishDate)}</h4>
            {videoDetails.description.split(/\s+/).map((word, index, array) => {
              if (/^https?:\/\/\S+$/.test(word)) {
                return (
                  <span key={index}>
                    <a href={word} target="_blank" rel="noopener noreferrer">
                      {word}
                    </a>
                    <br />
                  </span>
                );
              } else {
                return word + ' ';
              }
            })}
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
