import axios from 'axios';

const downloadFeed = (url) => {
  const newUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${url}`;
  return axios(newUrl)
    .then((response) => {
      const { data } = response;
      return data;
    })
    .catch((err) => {
      if (err.response) {
        throw new Error('downloadError');
      } else {
        throw new Error('networkError');
      }
    });
};

export default downloadFeed;
