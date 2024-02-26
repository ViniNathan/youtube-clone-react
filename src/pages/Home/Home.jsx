import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import userProfile from '../../assets/user_profile.jpg';
import { Link } from 'react-router-dom';
import { fetchVideoData } from '../../utils/home-api';
import { formatViews } from '../../utils/functions';
import './home.css';

const Home = () => {
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      const data = await fetchVideoData();
      console.log(data)
      // Filtra os videos para garantir chaves unicas
      const uniqueVideos = removeDuplicateVideos(data);
      setVideoData(uniqueVideos);
      const ids = (uniqueVideos.slice(0, 12).map((video) => video.video_id));
      console.log(ids);
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
        {videoData && videoData.slice(0, 12).map((video) => (
          <Link key={video.video_id} to={`/video/${video.video_id}`} className="home-video-links">
            <div className="video-card">
              <img
                src={`https://i.ytimg.com/vi/${video.video_id}/maxresdefault.jpg`}
                alt="Thumbnail"
                className='thumbnail'
                />
              <div className="video-duration">
                  <p>{video.video_length}</p>
              </div>
              <div className="video-details">
                <div className="channel-img">
                  <img src={userProfile}/>
                </div>
                <div className="details">
                  <h3>{video.title}</h3>
                  <p>{video.author}</p>
                  <p>{formatViews(video.number_of_views)} visualizações • {video.published_time}</p>
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
