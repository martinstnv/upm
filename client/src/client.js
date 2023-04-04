import axios from 'axios';
import config from './config';

const { serviceUrl } = config[process.env.REACT_APP_ENV];

const instance = axios.create({
    baseURL: serviceUrl,
    withCredentials: true,
});

instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
      window.location.reload();
    return Promise.reject(error);
  });

export default instance;