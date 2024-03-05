import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { fetchTrending } from '../../utils/home-api';
import { formatViews, removeDuplicateVideos } from '../../utils/functions';
import SearchShortsCard from '../../components/SearchShortsCard/SearchShortsCard';
import { SiYoutubeshorts } from "react-icons/si";
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTrending();
      // Filtra os vídeos para garantir chaves únicas
      const uniqueVideos = removeDuplicateVideos(data.data);
      setVideoData(uniqueVideos);
    };

    fetchData();
  }, []);


  return (
    <div>
      <Sidebar />
      <div className="home-container">
        <div className="home-video-container">
          {videoData && videoData.map((video) => {
            if (video.type === 'video') {
              return (
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
                        <img src={video.channelThumbnail[0].url} alt="Channel Thumbnail" />
                      </div>
                      <div className="details">
                        <h3>{video.title}</h3>
                        <p>{video.channelTitle}</p>
                        <p>{formatViews(video.viewCount)} visualizações • {video.publishedTimeText}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            } else if (video.type === 'shorts_listing') {
              return (
                <div className="shorts-wrapper" key={video.type}>
                  <div className="shorts-details">
                    <SiYoutubeshorts className="shorts-icon" />
                    <h2>Shorts</h2>
                  </div>
                  <div className="shorts-container">
                    {video.data.slice(0, 5).map(short => (
                      <SearchShortsCard
                        key={short.videoId}
                        thumbnail={short.thumbnail[0].url}
                        title={short.title}
                        views={formatViews(short.viewCountText)}
                        shortsId={short.videoId}
                      />
                    ))}
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
