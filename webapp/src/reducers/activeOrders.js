import { Map } from 'immutable';

import {
  REQUEST_ACTIVE_ORDERS, RECEIVE_ACTIVE_ORDERS,
  RECEIVE_NUM_ORDERS
} from '../actions/actionTypes';

const activeOrders = (state = Map(), action) => {
  switch (action.type) {
    case RECEIVE_ACTIVE_ORDERS:
      return action.activeOrders;

    case RECEIVE_NUM_ORDERS:
      return state.setIn([action.id, 'orders'], action.value);

    default:
      return state;
  }
};

export default activeOrders;
