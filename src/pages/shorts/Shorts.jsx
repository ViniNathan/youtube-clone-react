import React, { useEffect, useState } from 'react';
import { fetchShorts, fetchNextShorts } from '../../utils/videoServiceApi'
import Sidebar from '../../components/Sidebar/Sidebar';
import { BiSolidLike , BiSolidDislike} from "react-icons/bi";
import { MdComment } from "react-icons/md";
import { truncateString , formatViews} from '../../utils/functions';
import './shorts.css'

const Shorts = () => {
  const [shortsDetails, setShortsDetails] = useState(null);
  const [nextShortsDetails, setNextShortsDetails] = useState(null);
  const path = window.location.pathname;
  const query = path.split('/').pop();


  useEffect(() => {
    const getShortsData = async () => {
      try {
        const shortsData = await fetchShorts(query);
        setShortsDetails(shortsData);
        console.log(shortsData);

        const nextShortsData = await fetchNextShorts(query);
        setNextShortsDetails(nextShortsData);
        // console.log(nextShortsData.data);
      } catch (error) {
        console.error('Erro ao buscar os detalhes do shorts:', error);
      }
    };

    getShortsData();
  }, [query]);

  return (
    <div>
      <Sidebar/>
      {shortsDetails && (
        <div className="short-container">
          <div className="shorts-card">
          <iframe width="315" height="560" src={`https://www.youtube.com/embed/${shortsDetails.videoId}?rel=0&autoplay=1&controls=0`} frameborder="0"></iframe>
          </div>
          <div className="buttons-wrapper">
            <div className="shorts-button"><BiSolidLike/></div>
            <p>{shortsDetails.likeCountText}</p>
            <div className="shorts-button"><BiSolidDislike/></div>
            <p>Não gostei</p>
            <div className="shorts-button"><MdComment/></div>
            <p>{formatViews(shortsDetails.commentCount)}</p>
          </div>
          <img src={shortsDetails.channelThumbnail[2].url} alt="" className="channel-imgout"/>
          <div className="shorts-details-container">
            <div className="shorts-channel-details">
              <img src={shortsDetails.channelThumbnail[2].url} alt="" className='channel-imgin'/>
              <h3>{shortsDetails.channelTitle}</h3>
            </div>
            <p>{truncateString(shortsDetails.title, 7)}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Shorts
