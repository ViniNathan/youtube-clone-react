import React, { useEffect, useState } from 'react';
import { fetchSearch } from '../../utils/videoServiceApi';
import SearchVideoCard from '../../components/SearchVideoCard/SearchVideoCard';
import Sidebar from '../../components/Sidebar/Sidebar';
import { formatViews } from '../../utils/functions';
import './search.css';

const Search = () => {
  const [searchDetails, setSearchDetails] = useState(null);
  const path = window.location.pathname;
  const query = path.split('/').pop();

  useEffect(() => {
    const getSearchData = async () => {
      try {
        const searchData = await fetchSearch(query);
        setSearchDetails(searchData);
        console.log(searchData);
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
        {searchDetails && searchDetails.data.map(video => (
          // Renderiza somente se o tipo do conteudo for 'video'
          video.type === 'video' && (
            <SearchVideoCard
              key={video.videoId}
              thumb={video.thumbnail[0].url}
              time={video.publishedTimeText}
              channelTitle={video.channelTitle}
              channelImg={video.channelThumbnail[0].url}
              videoTitle={video.title}
              views={formatViews(video.viewCount)}
              videoDescription={video.description}
              videoId={video.videoId}
              channelId={video.channelHandle ? video.channelHandle : `channel/${video.channelId}`}
            />
          )
        ))}
      </div>
    </div>
  )
}

export default Search;
