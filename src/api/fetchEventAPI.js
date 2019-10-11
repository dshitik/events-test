import { callAPI } from '../helpers/callAPI'

export const fetchEventAPI = (id) => callAPI.get(`events/${id}`)
  .then(response => response.data);