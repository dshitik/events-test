import { callAPI } from '../helpers/callAPI'

export const registerUserAPI = (email, password) => callAPI.post(`users/register`, { email, password })
  .then(response => response.data);