import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSearch } from '../../utils/videoServiceApi'
import SearchVideoCard from '../../components/SearchVideoCard/SearchVideoCard'
import Sidebar from '../../components/Sidebar/Sidebar'
import './search.css'

const Search = () => {
  const [searchDetails, setSearchDetails] = useState(null);
  const { query } = useParams(); // Obtém a query da URL

  useEffect(() => {
    const getSearchData = async () => {
      try {
        const searchData = await fetchSearch(query);
        setSearchDetails(searchData);
      } catch (error) {
        console.error('Erro ao buscar os detalhes da pesquisa:', error);
      }
    };

    getSearchData();
  }, [query]);


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