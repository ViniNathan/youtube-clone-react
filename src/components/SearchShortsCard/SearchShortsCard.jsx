import React from 'react'
import { Link } from 'react-router-dom'
import { truncateString } from '../../utils/functions'
import './searchShortsCard.css'

const SearchShortsCards = ({thumbnail, title, views, shortsId}) => {
  return (
    <Link to ={`../shorts/${shortsId}`} className="search-shorts-card">
        <div className="search-shorts-thumbnail"><img src={thumbnail} alt="thumbnail" /></div>
        <div className="search-shorts-details">
            <p className='search-shorts-card-title'>{truncateString(title, 6)}</p>
            <p>{views}</p>
        </div>
    </Link>
  )
}

export default SearchShortsCards