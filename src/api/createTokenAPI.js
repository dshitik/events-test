import { callAPI } from '../helpers/callAPI'

export const createTokenAPI = (username, password) => callAPI.post(`users/token/`, { username, password });