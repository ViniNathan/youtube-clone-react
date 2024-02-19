import React from 'react'
import { VscMenu } from "react-icons/vsc";
import { IoMdPlay, IoIosSearch } from "react-icons/io";
import userProfile from '../../assets/user_profile.jpg'
import { Link } from 'react-router-dom'
import './navbar.css'


const Navbar = () => {
  return (
    <nav>
      <div className="nav-left">
        <VscMenu className='menu-icon'/>
        <Link to='/' className='nav-link'>
          <div className="yt-logo">
            <IoMdPlay className='logo-triangle'/>
          </div>
          <h1 className='logo-name'>YouTube</h1>
          <h3 className="logo-country">BR</h3>
        </Link>
      </div>

      <div className="nav-center">
        <div className="nav-input">
          <input type="text" placeholder='Pesquisar'/>
          <button><IoIosSearch/></button>
        </div>
      </div>

      <div className="nav-right">
        <img src={userProfile} />
      </div>
    </nav>
  )
}

export default Navbar