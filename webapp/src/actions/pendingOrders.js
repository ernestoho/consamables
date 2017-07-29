import 'whatwg-fetch';

import { Map, fromJS } from 'immutable';

import {
  REQUEST_PENDING_ORDERS, RECEIVE_PENDING_ORDERS,
  REQUEST_HAS_VOTED, RECEIVE_HAS_VOTED
} from './actionTypes';
import { fetchVotes } from './stats';
import { buildGetInit } from '../helpers';

const requestPendingOrders = () => ({ type: REQUEST_PENDING_ORDERS });

const receivePendingOrders = json => ({
  type: RECEIVE_PENDING_ORDERS,
  pendingOrders: json.reduce(
    (all, order) => all.set(order.groupId, fromJS(order).set('votes', 0)),
    Map()
  )
});

const fetchPendingOrders = (loggedIn) => {
  return dispatch => {
    dispatch(requestPendingOrders());
    fetch('/api/groups/pending')
      .then( response => response.json() )
      .then(json => {
        dispatch(receivePendingOrders(json));
        json.forEach(group => dispatch(fetchVotes(group.groupId)));
        if (loggedIn) {
          json.forEach(group => dispatch(checkVoted(group.groupId)));
        }
      });
  };
};

const requestHasVoted = () => ({ type: REQUEST_HAS_VOTED });

const receiveHasVoted = (groupId, json) => ({
  type: RECEIVE_HAS_VOTED,
  id: groupId,
  value: json
});

const checkVoted = groupId => {
  return dispatch => {
    dispatch(requestHasVoted());
    fetch(`/api/groups/${groupId}/has-voted-for`, buildGetInit())
      .then( response => response.json() )
      .then(json => {
        dispatch(receiveHasVoted(groupId, json));
      });
  };
};

export default fetchPendingOrders;
