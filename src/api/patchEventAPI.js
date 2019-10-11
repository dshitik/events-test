import { callAPI } from '../helpers/callAPI'

export const patchEventsAPI = ({ id, data }) => callAPI.patch(`events/${id}`, data)
  .then(response => response.data);