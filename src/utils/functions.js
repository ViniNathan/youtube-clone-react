export const formatViews = (views) => {
    if (views >= 1000000000) {
      return (views / 1000000000).toFixed(1).replace('.', ',') + ' bi de';
    } else if (views >= 1000000) {
      return (views / 1000000).toFixed(1).replace('.', ',') + ' mi de';
    } else if (views >= 1000) {
      return (views / 1000).toFixed(1).replace('.', ',') + ' mil';
    } else {
      return views;
    }
};

export const formatLikes = (likes) => {
    if (likes >= 1000000000) {
    return (likes / 1000000000).toFixed(1).replace('.', ',') + ' bi de';
    } else if (likes >= 1000000) {
      return (likes / 1000000).toFixed(1).replace('.', ',') + ' mi';
    } else if (likes >= 1000) {
      return (likes / 1000).toFixed(1).replace('.', ',') + ' mil';
    } else {
      return likes;
    }
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
};

export const truncateString = (title, maxWords) => {
  const words = title.split(' ');
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ') + '...';
  } else {
    return title;
  }
};



export const removeDuplicateVideos = (videos) => {
  const uniqueVideos = [];
  const ids = new Set();

  videos.forEach(video => {
    if (!ids.has(video.videoId)) {
      uniqueVideos.push(video);
      ids.add(video.videoId);
    }
  });

  return uniqueVideos;
};