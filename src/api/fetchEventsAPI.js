import { callAPI } from '../helpers/callAPI'

export const fetchEventsAPI = (limit, offset) => callAPI.get(`events/?limit=${limit || 10}&offset=${offset || 0}`)
  .then(response => response.data);