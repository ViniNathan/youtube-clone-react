import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BiLike, BiDislike } from 'react-icons/bi';
import { PiShareFatLight } from 'react-icons/pi';
import VideoCard from '../../components/videoSuggestionCard/VideoCard';
import CommentCard from '../../components/commentCard/CommentCard';
import { fetchVideoDetails, fetchChannelDetails, fetchRelated, fetchComments} from '../../utils/videoServiceApi';
import { formatViews, formatDate } from '../../utils/functions';
import './video.css';

const Video = () => {
  const [videoDetails, setVideoDetails] = useState(null);
  const [commentsDetails, setCommentsDetails] = useState(null);
  const [channelDetails, setChannelDetails] = useState(null);
  const [relatedDetails, setRelatedDetails] = useState(null);
  const { videoId } = useParams(); // Obtém o videoId da URL

  useEffect(() => {
    const getVideoDetails = async () => {
      try {
        const videoData = await fetchVideoDetails(videoId);
        setVideoDetails(videoData);

        // Obtém os detalhes do canal usando o channelId do video
        const channelData = await fetchChannelDetails(videoData.channelId);
        setChannelDetails(channelData);

        // Obtém os videos relacionados
        const relatedData = await fetchRelated(videoId);
        setRelatedDetails(relatedData);

        // Obtém os comentários
        const commentsData = await fetchComments(videoId);
        setCommentsDetails(commentsData);
      } catch (error) {
        console.error('Erro ao buscar os detalhes do vídeo:', error);
      }
    };

    getVideoDetails();
  }, [videoId]);



  return (
    <div className="videopage-grid">
      {videoDetails && channelDetails && relatedDetails && commentsDetails? (
        <>
          <div className="video-screen">
            <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1&showinfo=0&controls=1&autohide=1&modestbranding=1&rel=0&fs=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          </div>
          <div className="video-title">{videoDetails.title}</div>
          <div className="video-channel">
            <a href={`https://www.youtube.com/${channelDetails.channelHandle ? channelDetails.channelHandle : channelDetails.channelId}`}>
            <img src={videoDetails.channelThumbnail[2].url} alt="" />
            </a>
          </div>
          <div className="channel-details">
            <a href={`https://www.youtube.com/${channelDetails.channelHandle}`}><h3>{videoDetails.channelTitle}</h3></a>
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
            {relatedDetails.data.map((relatedVideo) => (
              <VideoCard
                key={relatedVideo.videoId}
                thumb={relatedVideo.thumbnail[0].url}
                time={relatedVideo.lengthText}
                channelTitle={relatedVideo.channelTitle}
                videoTitle={relatedVideo.title}
                views={formatViews(relatedVideo.viewCount)}
                videoDescription={relatedVideo.description}
                videoId={relatedVideo.videoId}
                channelId={relatedVideo.channelHandle}
                channelHandle={relatedVideo.channelHandle}
                publishedTimeText={relatedVideo.publishedTimeText}
                isLiveContent={relatedVideo.isLiveContent}
              />
            ))}
          </div>
          <div className="video-description">
          <h4>{formatViews(videoDetails.viewCount)} Visualizações • {formatDate(videoDetails.publishDate)}</h4>
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
            <h3>{commentsDetails.commentsCount} comentários</h3>
            {commentsDetails.data.map((comments) => (
              <CommentCard
                key={comments.videoId}
                authorName={comments.authorText}
                authorThumbnail={comments.authorThumbnail[0].url}
                textDisplay={comments.textDisplay}
                publishedTimeText={comments.publishedTimeText}
                likesCount={comments.likesCount}
              />
            ))}
          </div>
        </>
      ) : (
        <p className='loading'>Carregando...</p>
      )}
    </div>
  );
};

export default Video;
