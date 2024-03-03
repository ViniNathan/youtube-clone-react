import React from 'react'
import { GoHomeFill } from "react-icons/go";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { Link } from 'react-router-dom'
import './sidebar.css'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-top">
            <Link to="/" className='side-buttons'>
                <div className="sidebar-card">
                    <GoHomeFill className='side-icon'/>
                    <h3>Início</h3>
                </div>
            </Link>

            <Link to="/shorts" className='side-buttons'>
                <div className="sidebar-card">
                    <SiYoutubeshorts className='side-icon'/>
                    <h3>Shorts</h3>
                </div>
            </Link>
            
            
            <div className="sidebar-card">
                <MdSubscriptions className='side-icon'/>
                <h3>Portfolio</h3>
            </div>
        </div>
    </div>
  )
}

export default Sidebar