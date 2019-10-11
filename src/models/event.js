import { types } from 'mobx-state-tree';
import { Organizer } from "./organizer";

export const Event = types.model({
  id: types.number,
  provider: types.number,
  name: types.string,
  uri: types.string,
  startTime: types.Date,
  finishTime: types.Date,
  ticketPriceCurrency: types.string,
  minTicketPrice: types.string,
  maxTicketPrice: types.string,
  logoUri: types.string,
})