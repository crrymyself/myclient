import Axios from 'axios';

export const  postApiLogin = payload => 
  new Promise((resolve, reject) => {
    Axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
      ...payload,
    })
      .then(resolve)
      .catch(reject)
  })