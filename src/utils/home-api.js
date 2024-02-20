import axios from "axios";

export const fetchVideoData = async () => {
  const options = {
    method: 'GET',
    url: 'https://youtube-v2.p.rapidapi.com/trending/',
    params: {lang: 'pt', country: 'br', section: 'Now'},
    headers: {
      'X-RapidAPI-Key': '4373c0479dmshd60398751fc667cp1a0de0jsne460c0931c68',
      'X-RapidAPI-Host': 'youtube-v2.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data.videos;
  } catch (error) {
    console.error(error);
    return null;
  }
};
