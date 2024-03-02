import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Link } from 'react-router-dom';
import { fetchTrending } from '../../utils/home-api';
import { formatViews } from '../../utils/functions';
import './home.css';

const Home = () => {
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      const data = await fetchTrending();
      // Filtra os videos para garantir chaves unicas
      const uniqueVideos = removeDuplicateVideos(data.data);
      setVideoData(uniqueVideos);
    };

    fetchVideos();
  }, []);

  const removeDuplicateVideos = (videos) => {
    const uniqueVideos = [];
    const ids = new Set();
  
    videos.forEach(video => {
      if (!ids.has(video.videoId)) {
        uniqueVideos.push(video);
        ids.add(video.videoId);
      }
    });
  
    return uniqueVideos;
  };
  

  return (
    <div>
      <Sidebar />
      <div className="home-video-container">
        {videoData && videoData.slice(0, 20).map((video) => (
          video.type === 'video' && (
          <Link key={video.videoId} to={`/video/${video.videoId}`} className="home-video-links">
            <div className="video-card">
              <img
                src={video.thumbnail[2] ? video.thumbnail[2].url : video.thumbnail[0].url}
                alt="Thumbnail"
                className='thumbnail'
                />
              <div className="video-duration">
                  <p>{video.lengthText}</p>
              </div>
              <div className="video-details">
                <div className="channel-img">
                  <img src={video.channelThumbnail[0].url}/>
                </div>
                <div className="details">
                  <h3>{video.title}</h3>
                  <p>{video.channelTitle}</p>
                  <p>{formatViews(video.viewCount)} visualizações • {video.publishedTimeText}</p>
                </div>
              </div>
            </div>
          </Link>
          )
        ))}
      </div>
    </div>
  );
};

export default Home;
