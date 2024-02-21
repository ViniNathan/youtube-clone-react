import React from 'react'
import { BiSolidLike , BiSolidDislike} from "react-icons/bi";
import { MdComment } from "react-icons/md";

import './shorts.css'

const Shorts = () => {
  return (
    <div className="shorts-grid">
      <div className="shorts-card"></div>
      <div className="shorts-button like"><BiSolidLike/></div>
      <div className="shorts-button dislike"><BiSolidDislike/></div>
      <div className="shorts-button comment"><MdComment/></div>

    </div>
  )
}

export default Shorts