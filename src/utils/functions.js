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