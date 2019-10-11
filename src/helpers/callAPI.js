import axios from 'axios';
import { getToken } from './auth'

export const callAPI = axios.create({
  baseURL: `http://api.my-events.site/api/v1/`
});


callAPI.interceptors.request.use(function (config) {
  const token = getToken();

  if ( token != null ) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
},  (err) => {
  return Promise.reject(err);
});