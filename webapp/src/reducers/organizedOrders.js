import { Map } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import { REQUEST_ORGANIZED_ORDERS, RECEIVE_ORGANIZED_ORDERS } from '../actions/actionTypes';

const organizedOrders = (state = Map(), action) => {
  switch (action.type) {
    case RECEIVE_ORGANIZED_ORDERS:
      return action.organizedOrders;

    case LOCATION_CHANGE:
      if (action.payload.pathname == '/login') {
        return state.clear();
      }
      return state;

    default:
      return state;
  }
};

export default organizedOrders;
