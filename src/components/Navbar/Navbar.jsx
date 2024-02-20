import React, { useState } from 'react';
import { VscMenu } from "react-icons/vsc";
import { IoMdPlay, IoIosSearch } from "react-icons/io";
import userProfile from '../../assets/user_profile.jpg'
import { Link } from 'react-router-dom'
import './navbar.css'


const Navbar = () => {
  const [results, setResults] = useState([]);
  
  const handleInputChange = async (event) => {
    const query = event.target.value;
    // Fazer uma chamada à API para obter as sugestões com base na query
    try {
      const response = await fetch(`https://youtube138.p.rapidapi.com/auto-complete/?q=${query}&hl=pt&gl=BR`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '4373c0479dmshd60398751fc667cp1a0de0jsne460c0931c68',
          'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
        }
      });
      const data = await response.json();
      setResults(data.results); // Atualizar as sugestões com base nos resultados da API
    } catch (error) {
      console.error('Erro ao obter sugestões:', error);
    }
  };

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
          <input type="text" placeholder='Pesquisar' onChange={handleInputChange} />
          <button><IoIosSearch/></button>
        </div>
      </div>
      {results && results.length > 0 &&
        <div className='input-suggestions'>
          {results.map((result, index) => (
            <button key={index} className='suggestions'><IoIosSearch className='sugg-icon'/>{result}</button>
          ))}
        </div>
      };
      <div className="nav-right">
        <img src={userProfile} />
      </div>
    </nav>
  )
}

export default Navbar