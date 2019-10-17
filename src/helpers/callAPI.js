import axios from 'axios';
import { Base64 } from 'js-base64';
import { getToken } from './auth'

export const callAPI = axios.create({
  baseURL: `http://api.my-events.site/api/v1/`
});


callAPI.interceptors.request.use(function (config) {
  const token = getToken();
  const bToken = new Buffer('test@test2.ru' + ':' + 'admin2019').toString('base64');
  if ( token != null && config.method !== 'get' ) {
    config.headers.Authorization = `Basic ${token}`;

  }
  return config;
}, (err) => {
  return Promise.reject(err);
});