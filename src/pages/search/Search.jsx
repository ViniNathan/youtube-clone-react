import React, { useEffect, useState } from 'react';
import { fetchSearch } from '../../utils/videoServiceApi';
import SearchVideoCard from '../../components/SearchVideoCard/SearchVideoCard';
import SearchShortsCard from '../../components/SearchShortsCard/SearchShortsCard';
import Sidebar from '../../components/Sidebar/Sidebar';
import { formatViews, truncateString } from '../../utils/functions';
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
        {searchDetails && searchDetails.data.map((content) => {
          // Renderiza componentes de vídeo primeiro
          if (content.type === 'video') {
            return (
              <SearchVideoCard
                key={content.videoId}
                thumb={content.thumbnail[0].url}
                time={content.publishedTimeText}
                channelTitle={content.channelTitle}
                channelImg={content.channelThumbnail[0].url}
                videoTitle={content.title}
                views={formatViews(content.viewCount)}
                videoDescription={content.description}
                videoId={content.videoId}
                channelId={content.channelHandle ? content.channelHandle : `channel/${content.channelId}`}
              />
            );
          }
          // Renderiza componentes de shorts em seguida
          else if (content.type === 'shorts_listing') {
            return (
              <div className="shorts-container" key={content.type}>
                {content.data.slice(0, getNumberOfShortsToShow()).map(short => (
                  <SearchShortsCard
                    key={short.videoId}
                    thumbnail={short.thumbnail[0].url}
                    title={truncateString(short.title, 9)}
                    views={formatViews(short.viewCountText)}
                    shortsId={short.videoId}
                  />
                ))}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
  
  function getNumberOfShortsToShow() {
    // Obtém a largura da tela
    const screenWidth = window.innerWidth;

    // Define o número de shorts com base na largura da tela
    if (screenWidth < 768) {
      return 3; // Exibe 3 shorts para telas menores que 768px
    } else if (screenWidth < 1024) {
      return 5; // Exibe 5 shorts para telas entre 768px e 1024px
    } else {
      return 5; // Exibe 7 shorts para telas maiores que 1024px
    }
  }

}

export default Search;
