import React, { useEffect, useState } from 'react';
import userProfile from '../../assets/user_profile.jpg'
import axios from "axios";
import './home.css'


const Home = () => {
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    // Definindo os parâmetros da requisição à API
    const options = {
      method: 'GET',
      url: 'https://youtube-v2.p.rapidapi.com/trending/',
      params: {lang: 'pt', country: 'br', section: 'Now'},
      headers: {
        'X-RapidAPI-Key': '4373c0479dmshd60398751fc667cp1a0de0jsne460c0931c68',
        'X-RapidAPI-Host': 'youtube-v2.p.rapidapi.com'
      }
    };

    // Fazendo a chamada à API ao montar o componente
    axios
      .request(options)
      .then(function (response) {
        setVideoData(response.data.videos); // Ajustando para acessar a lista de vídeos
      })
      .catch(function (error) {
        console.error(error);
      });
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
              <p>{video.number_of_views} views</p>
            </div>
          </div>
        </div>
      ))}
    </div>

  );
};

export default Home;