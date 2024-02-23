import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BiLike, BiDislike } from 'react-icons/bi';
import { PiShareFatLight } from 'react-icons/pi';
import VideoCard from '../../components/videoSuggestionCard/VideoCard';
import CommentCard from '../../components/commentCard/CommentCard';
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
        console.log(videoData.id)

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
          <div className="video-screen">
            <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1&showinfo=0&controls=0&autohid=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          </div>
          <div className="video-title">{videoDetails.title}</div>
          <div className="video-channel">
            <img src={channelDetails.avatar[2].url} alt="" />
          </div>
          <div className="channel-details">
            <h3>{videoDetails.channelTitle}</h3>
            <p>{channelDetails.subscriberCountText} Inscritos</p>
          </div>
          <button className="sub-btn">Inscrever-se</button>
          <div className="btn-container">
            <button className="like">
              <BiLike />
              <p>Like</p>
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
            <VideoCard/>
            <VideoCard/>
            <VideoCard/>
            <VideoCard/>
          </div>
          <div className="video-description">
          <h4>{videoDetails.viewCount} Visualizações • {formatDate(videoDetails.publishDate)}</h4>
            {videoDetails.description.split(/\s+/).map((word, index) => {
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
          <div className="comments-section">
            <h3>NUMERO comentários</h3>
            <CommentCard />
            <CommentCard />
            <CommentCard />
            <CommentCard />
          </div>
        </>
      ) : (
        <p className='loading'>Carregando...</p>
      )}
    </div>
  );
};

export default Video;
