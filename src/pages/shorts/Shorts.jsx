import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar';
import { BiSolidLike , BiSolidDislike} from "react-icons/bi";
import { MdComment } from "react-icons/md";
import user_profile from '../../assets/user_profile.jpg'

import './shorts.css'

const Shorts = () => {
  return (
    <div>
      <Sidebar/>
      <div className="shorts-grid">
      <div className="shorts-card"></div>
      <div className="shorts-button like"><BiSolidLike/></div>
      <div className="shorts-button dislike"><BiSolidDislike/></div>
      <div className="shorts-button comment"><MdComment/></div>
      <div className="channel-imgout"><img src={user_profile} alt="" /></div>
      <div className="channel-imgin"><img src={user_profile} alt="" /></div>
      <div className="shorts-channel-name">Nome do canal</div>
      <div className="shorts-title">Título</div>
    </div>
    </div>
  )
}

export default Shorts