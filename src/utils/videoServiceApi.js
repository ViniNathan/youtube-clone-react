import axios from 'axios';

export const fetchVideoDetails = async (videoId) => {
  const options = {
    method: 'GET',
    url: `https://yt-api.p.rapidapi.com/video/info?id=${videoId}`,
    headers: {
      'X-RapidAPI-Key': '4373c0479dmshd60398751fc667cp1a0de0jsne460c0931c68',
      'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar os detalhes do vídeo:', error);
    throw error;
  }
};

export const fetchChannelDetails = async (channelId) => {
  const options = {
    method: 'GET',
    url: `https://yt-api.p.rapidapi.com/channel/about?id=${channelId}`,
    headers: {
      'X-RapidAPI-Key': '4373c0479dmshd60398751fc667cp1a0de0jsne460c0931c68',
      'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  }
  catch (error) {
    console.error('Erro ao buscar os detalhes do canal:', error);
    throw error;
  }
};


export const fetchSearch = async (query) => {
  const options = {
    method: 'GET',
    url: `https://yt-api.p.rapidapi.com/search?query=${query}`,
    params: {
      geo: 'BR',
      lang: 'pt'
    },
    headers: {
      'X-RapidAPI-Key': '4373c0479dmshd60398751fc667cp1a0de0jsne460c0931c68',
      'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  }
  catch (error) {
    console.error('Erro ao realizar a pesquisa:', error);
    throw error;
  }
};

