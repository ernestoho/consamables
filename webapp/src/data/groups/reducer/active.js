import { Map } from 'immutable';

import { types } from '../actions';

export default (state = Map(), action) => {
  switch (action.type) {
    case types.RECEIVE_ACTIVE_GROUPS:
      return action.activeGroups;

    case types.RECEIVE_NUM_ORDERS:
      return state.setIn([action.id, 'orders'], action.value);

    default:
      return state;
  }
};
