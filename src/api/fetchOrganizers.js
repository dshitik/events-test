import { callAPI } from '../helpers/callAPI'

export const fetchOrganizers = (limit, offset) => callAPI.get(`organizers/?limit=${limit || 5}&offset=${offset || 0}`);