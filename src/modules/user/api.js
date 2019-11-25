import Axios from 'axios';

export const  postApiLogin = payload =>
  new Promise((resolve, reject) => {
    Axios.post('/api/user/login', {
      ...payload,
    })
      .then(resolve)
      .catch(reject);
  });
