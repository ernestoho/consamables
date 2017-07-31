import { Map } from 'immutable';

import { types } from './actions';

export default (state = Map(), action) => {
  switch (action.type) {
    case types.RECEIVE_USERNAME:
      return state.set(action.id, action.value);

    default:
      return state;
  }
};
