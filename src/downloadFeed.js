import axios from 'axios';

const downloadFeed = (url) => {
  const newUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${url}`;
  return axios(newUrl)
    .then((response) => {
      if (response.status === 200) {
        const { data } = response;
        return data;
      }
      throw new Error('downloadError');
    })
    .catch(() => {
      throw new Error('downloadError');
    });
};

export default downloadFeed;
