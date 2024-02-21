import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import userProfile from '../../assets/user_profile.jpg';
import { Link } from 'react-router-dom';
import { fetchVideoData } from '../../utils/home-api';
import './home.css';

const Home = () => {
  const [videoData, setVideoData] = useState(null);

  const formatViews = (views) => {
    if (views >= 1000000000) {
      return (views / 1000000000).toFixed(1).replace('.', ',') + ' bi';
    } else if (views >= 1000000) {
      return (views / 1000000).toFixed(1).replace('.', ',') + ' mi';
    } else if (views >= 1000) {
      return (views / 1000).toFixed(1).replace('.', ',') + ' mil';
    } else {
      return views;
    }
  };

  useEffect(() => {
    const fetchVideos = async () => {
      const data = await fetchVideoData();
      // Filtra os videos para garantir chaves unicas
      const uniqueVideos = removeDuplicateVideos(data);
      setVideoData(uniqueVideos);
    };

    fetchVideos();
  }, []);

  // Funcao para remover videos duplicados com base no video_id
  const removeDuplicateVideos = (videos) => {
    const uniqueVideos = [];
    const ids = new Set();

    videos.forEach(video => {
      if (!ids.has(video.video_id)) {
        uniqueVideos.push(video);
        ids.add(video.video_id);
      }
    });

    return uniqueVideos;
  };

  return (
    <div>
      <Sidebar />
      <div className="home-video-container">
        {videoData && videoData.map((video) => (
          <Link key={video.video_id} to={`/video/${video.video_id}`} className="home-video-links">
            <div className="video-card">
              <img src={video.thumbnails[2].url} alt="Thumbnail" className='thumbnail' />
              <div className="video-duration">
                  <p>{video.video_length}</p>
              </div>
              <div className="video-details">
                <div className="channel-img">
                  <img src={userProfile} alt="" />
                </div>
                <div className="details">
                  <h3>{video.title}</h3>
                  <p>{video.author}</p>
                  <p>{formatViews(video.number_of_views)} visualizações</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
