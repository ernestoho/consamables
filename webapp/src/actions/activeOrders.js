import 'whatwg-fetch';

import { Map, fromJS } from 'immutable';

import { REQUEST_ACTIVE_ORDERS, RECEIVE_ACTIVE_ORDERS } from './actionTypes';
import { fetchNumOrders } from './stats';

const requestActiveOrders = () => ({ type: REQUEST_ACTIVE_ORDERS });

const receiveActiveOrders = json => ({
  type: RECEIVE_ACTIVE_ORDERS,
  activeOrders: json.reduce(
    (all, order) => all.set(order.groupId, fromJS(order).set('orders', 0)),
    Map()
  )
});

const fetchActiveOrders = () => {
  return dispatch => {
    dispatch(requestActiveOrders());
    fetch('/api/groups/active')
      .then( response => response.json() )
      .then(json => {
        dispatch(receiveActiveOrders(json));
        json.forEach(group => dispatch(fetchNumOrders(group.groupId)));
      });
  };
};

export default fetchActiveOrders;
