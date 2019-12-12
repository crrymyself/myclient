import Axios from 'axios';

export const  fetchArticles = payload =>
  new Promise((resolve, reject) => {
    Axios.get('/api/getDate', {
      ...payload,
    })
      .then(resolve)
      .catch(reject);
  });
