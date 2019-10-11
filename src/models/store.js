import { types, flow } from "mobx-state-tree"
import { createContext } from 'react';
import makeInspectable from 'mobx-devtools-mst';
import { fetchEventsAPI } from '../api/fetchEventsAPI'
import { fetchEventAPI } from '../api/fetchEventAPI'
import { Organizer } from "./organizer";
import { Event } from "./event"


const EventsPage = types.model({
  loading: false,
  error: false,
  totalEvents: types.number,
  events: types.array(Event)
});

const CurrentEvent = types.model({
  loading: false,
  error: false,
  info: types.model({
    name: types.string,
    uri: types.string,
    category: types.model({
      id: types.number,
      name: types.string,
      provider: types.number
    }),
    organizer: types.model({
      id: types.number,
      name: types.string,
      uri: types.string,
      logoUri: types.string,
      provider: types.number,
    }),
    description: types.string,
  })
});

const Store = types.model({
  organizers: types.array(Organizer),
  eventsPage: EventsPage,
  currentEvent: CurrentEvent
}).views(self => ({
  get totalOrganizers() {
    return self.organizers.length
  }
})).actions(self => ({
  fetchEvents: flow(function* fetchEvents(limit, offset) {
    self.eventsPage.events = [];
    self.eventsPage.loading = true;
    try {
      const eventsInfo = yield fetchEventsAPI(limit, offset);
      eventsInfo.results.forEach((event) => {
        self.eventsPage.events.push({
            id: event.id,
            provider: event.provider,
            name: event.name,
            uri: event.uri,
            startTime: new Date(event['start_time']),
            finishTime: new Date(event['finish_time']),
            ticketPriceCurrency: event['ticket_price_currency'],
            minTicketPrice: event['min_ticket_price'],
            maxTicketPrice: event['max_ticket_price'],
            logoUri: event['logo_uri'] || "https://via.placeholder.com/300",
          }
        );
      });
      self.eventsPage.totalEvents = eventsInfo.count;
      self.eventsPage.loading = false;
    } catch ( error ) {
      self.eventsPage.error = true;
      self.eventsPage.loading = false;
    }
  }),
  fetchEvent: flow(function* fetchEvent(id) {
    self.currentEvent.loading = true;
    try {
      const eventInfo = yield fetchEventAPI(id);
      self.currentEvent.info = {
        name: eventInfo.name,
        uri: eventInfo.uri,
        category: {
          id: eventInfo.category.id,
          name: eventInfo.category.name,
          provider: eventInfo.category.provider,
        },
        organizer: {
          id: eventInfo.organizer.id,
          name: eventInfo.organizer.name,
          uri: eventInfo.organizer.uri,
          logoUri: eventInfo.organizer.logo_uri,
          provider: eventInfo.organizer.provider,
        },
        description: eventInfo.description_html,
      };
      self.currentEvent.loading = false;
    } catch ( error ) {
      self.currentEvent.error = true
      self.currentEvent.loading = false;
    }
  }),
}));

const store = Store.create({
  organizers: [],
  eventsPage: {
    loading: false,
    error: false,
    totalEvents: 0,
    events: []
  },
  currentEvent: {
    loading: false,
    error: false,
    info: {
      name: '',
      uri: '',
      category: {
        id: 0,
        name: '',
        provider: 0
      },
      organizer: {
        id: 0,
        name: '',
        uri: '',
        logoUri: '',
        provider: 0,
      },
      description: '',
    },
  }
});
makeInspectable(store);
export const StoreContext = createContext(store);