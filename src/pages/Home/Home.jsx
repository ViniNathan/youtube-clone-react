import React, { useEffect, useState } from 'react';
import userProfile from '../../assets/user_profile.jpg';
import './home.css';
import { fetchVideoData } from '../../utils/home-api';

const Home = () => {
  const [videoData, setVideoData] = useState(null);

  // Função para formatar o número de visualizações
  const formatViews = (views) => {
    // Se as visualizações forem maiores ou iguais a um bilhão
    if (views >= 1000000000) {
      return (views / 1000000000).toFixed(1).replace('.', ',') + ' bi';
    } 
    // Se as visualizações forem maiores ou iguais a um milhão
    else if (views >= 1000000) {
      return (views / 1000000).toFixed(1).replace('.', ',') + ' mi';
    } 
    // Se as visualizações forem maiores ou iguais a mil
    else if (views >= 1000) {
      return (views / 1000).toFixed(1).replace('.', ',') + ' mil';
    } 
    // Caso contrário, retornar as visualizações como estão
    else {
      return views;
    }
  };

  useEffect(() => {
    const fetchVideos = async () => {
      const data = await fetchVideoData();
      setVideoData(data);
    };

    fetchVideos();
  }, []);

  return (
    <div className="home-video-container">
      {/* Renderizando cada vídeo individualmente */}
      {videoData && videoData.map((video, index) => (
        <div key={index} className="video-card">
          <img src={video.thumbnails[2].url} alt="Thumbnail" className='thumbnail'/>
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
      ))}
    </div>
  );
};

export default Home;
