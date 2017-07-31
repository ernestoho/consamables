import { Map } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import { types } from '../actions';

export default (state = Map(), action) => {
  switch (action.type) {
    case types.RECEIVE_MY_GROUPS:
      return action.myGroups;

    case LOCATION_CHANGE:
      if (action.payload.pathname === '/login') {
        return state.clear();
      }
      return state;

    default:
      return state;
  }
};
