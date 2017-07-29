import { Map } from 'immutable';

import { RECEIVE_USERNAME } from '../actions/actionTypes';

const users = (state = Map(), action) => {
  switch (action.type) {
    case RECEIVE_USERNAME:
      return state.set(action.id, action.value);

    default:
      return state;
  }
};

export default users;
