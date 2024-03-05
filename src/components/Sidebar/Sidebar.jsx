import React, { useEffect, useState } from 'react';
import { GoHomeFill } from "react-icons/go";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { fetchTrending } from '../../utils/home-api'
import { removeDuplicateVideos } from '../../utils/functions';
import { Link } from 'react-router-dom'
import './sidebar.css'

const Sidebar = () => {
  const [shortsVideo, setShortsVideo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTrending();
      // Filtra os vídeos para garantir chaves únicas
      const uniqueVideos = removeDuplicateVideos(data.data);
      const shortsVideo = uniqueVideos.find(video => video.type === "shorts_listing");
      if (shortsVideo) {
        setShortsVideo(shortsVideo);
      }
    };
    fetchData();
  }, []);

  // Gerar um número aleatório entre 0 e 15
  const randomIndex = Math.floor(Math.random() * 15);

  return (
    <div className='sidebar'>
        <div className="sidebar-top">
            <Link to="/" className='side-buttons'>
                <div className="sidebar-card">
                    <GoHomeFill className='side-icon'/>
                    <h3>Início</h3>
                </div>
            </Link>

            {shortsVideo && (
              <Link to={`/shorts/${shortsVideo.data[randomIndex].videoId}`} className='side-buttons'>
                  <div className="sidebar-card">
                      <SiYoutubeshorts className='side-icon'/>
                      <h3>Shorts</h3>
                  </div>
              </Link>
            )}
            
            <div className="sidebar-card">
                <MdSubscriptions className='side-icon'/>
                <h3>Portfolio</h3>
            </div>
        </div>
    </div>
  )
}

export default Sidebar;
