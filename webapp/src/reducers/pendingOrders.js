import { Map } from 'immutable';

import {
  REQUEST_PENDING_ORDERS, RECEIVE_PENDING_ORDERS,
  RECEIVE_VOTES, RECEIVE_HAS_VOTED
} from '../actions/actionTypes';

const pendingOrders = (state = Map(), action) => {
  switch (action.type) {
    case RECEIVE_PENDING_ORDERS:
      return action.pendingOrders;

    case RECEIVE_VOTES:
      return state.setIn([action.id, 'votes'], action.value);

    case RECEIVE_HAS_VOTED:
      return state.setIn([action.id, 'hasVoted'], action.value);

    default:
      return state;
  }
};

export default pendingOrders;
