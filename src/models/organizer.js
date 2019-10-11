import { types } from 'mobx-state-tree';

export const Organizer = types.model({
  id: types.number,
  name: types.string,
  uri: types.string,
  logoUri: types.string,
  provider: types.number,
}).views((self) => ({
  get organizerName() {
    return self.name
  }
}))