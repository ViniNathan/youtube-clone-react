import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import SearchVideoCard from '../../components/SearchVideoCard/SearchVideoCard'
import './search.css'

const Search = () => {
  return (
    <div>
        <Sidebar/>
        <div className="search-container">
            <SearchVideoCard/>
            <SearchVideoCard/>
            <SearchVideoCard/>
            <SearchVideoCard/>
        </div>
    </div>
  )
}

export default Search