import { Map, fromJS } from 'immutable';
import { push } from 'react-router-redux';

import { createActionTypes, buildGetRequest, buildPostRequest } from 'common/utils';

import { userActions } from '../users';

const prefix = 'GROUPS';

export const types = createActionTypes([
  'REQUEST_ACTIVE_GROUPS',
  'RECEIVE_ACTIVE_GROUPS',
  'REQUEST_PENDING_GROUPS',
  'RECEIVE_PENDING_GROUPS',
  'REQUEST_ORGANIZED_GROUPS',
  'RECEIVE_ORGANIZED_GROUPS',
  'REQUEST_MY_GROUPS',
  'RECEIVE_MY_GROUPS',
  'REQUEST_NUM_ORDERS',
  'RECEIVE_NUM_ORDERS',
  'REQUEST_NUM_VOTES',
  'RECEIVE_NUM_VOTES',
  'REQUEST_HAS_VOTED',
  'RECEIVE_HAS_VOTED',
], prefix);

export const actions = {
  requestActiveGroups: () => ({ type: types.REQUEST_ACTIVE_GROUPS }),

  receiveActiveGroups: json => ({
    type: types.RECEIVE_ACTIVE_GROUPS,
    activeGroups: json.reduce(
      (all, order) => all.set(order.groupId, fromJS(order).set('orders', 0)),
      Map(),
    ),
  }),

  fetchActiveGroups: () => dispatch => {
    dispatch(actions.requestActiveGroups());
    fetch('/api/groups/active')
      .then(response => response.json())
      .then(json => {
        dispatch(actions.receiveActiveGroups(json));
        json.forEach(group => dispatch(actions.fetchNumOrders(group.groupId)));
      });
  },

  requestPendingGroups: () => ({ type: types.REQUEST_PENDING_GROUPS }),

  receivePendingGroups: json => ({
    type: types.RECEIVE_PENDING_GROUPS,
    pendingGroups: json.reduce(
      (all, order) => all.set(order.groupId, fromJS(order).set('votes', 0)),
      Map(),
    ),
  }),

  fetchPendingGroups: loggedIn => dispatch => {
    dispatch(actions.requestPendingGroups());
    fetch('/api/groups/pending')
      .then(response => response.json())
      .then(json => {
        dispatch(actions.receivePendingGroups(json));
        json.forEach(group => dispatch(actions.fetchNumVotes(group.groupId)));
        if (loggedIn) {
          json.forEach(group => dispatch(actions.checkVoted(group.groupId)));
        }
      });
  },

  requestOrganizedGroups: () => ({ type: types.REQUEST_ORGANIZED_GROUPS }),

  receiveOrganizedGroups: json => ({
    type: types.RECEIVE_ORGANIZED_GROUPS,
    organizedGroups: json.reduce(
      (all, order) => all.set(order.groupId, fromJS(order)),
      Map(),
    ),
  }),

  fetchOrganizedGroups: () => dispatch => {
    dispatch(actions.requestOrganizedGroups());
    fetch('/api/groups/organized', buildGetRequest())
      .then(response => {
        response.json().then(json => {
          if (response.ok) {
            dispatch(actions.receiveOrganizedGroups(json));
            json.forEach(group => {
              group.orders.forEach(({ userId }) => {
                dispatch(userActions.fetchUsername(userId));
              });
            });
          } else {
            dispatch(push('/login'));
          }
        });
      });
  },

  requestMyGroups: () => ({ type: types.REQUEST_MY_GROUPS }),

  receiveMyGroups: json => ({
    type: types.RECEIVE_MY_GROUPS,
    myGroups: json.reduce(
      (all, order) => all.set(order.groupId, fromJS(order)),
      Map(),
    ),
  }),

  fetchMyGroups: () => dispatch => {
    dispatch(actions.requestMyGroups());
    fetch('/api/groups/joined', buildGetRequest())
      .then(response => {
        response.json().then(json => {
          if (response.ok) {
            dispatch(actions.receiveMyGroups(json));
          } else if (response.status === 401) {
            dispatch(push('/login'));
          }
        });
      });
  },

  requestNumOrders: groupId => ({
    type: types.REQUEST_NUM_ORDERS,
    id: groupId,
  }),

  receiveNumOrders: (groupId, json) => ({
    type: types.RECEIVE_NUM_ORDERS,
    id: groupId,
    value: json,
  }),

  fetchNumOrders: groupId => dispatch => {
    dispatch(actions.requestNumOrders(groupId));
    fetch(`/api/groups/${groupId}/count-orders`)
      .then(response => response.json())
      .then(json => dispatch(actions.receiveNumOrders(groupId, json)));
  },

  requestNumVotes: groupId => ({
    type: types.REQUEST_NUM_VOTES,
    id: groupId,
  }),

  receiveNumVotes: (groupId, json) => ({
    type: types.RECEIVE_NUM_VOTES,
    id: groupId,
    value: json,
  }),

  fetchNumVotes: groupId => dispatch => {
    dispatch(actions.requestNumVotes(groupId));
    fetch(`/api/groups/${groupId}/count-votes`)
      .then(response => response.json())
      .then(json => dispatch(actions.receiveNumVotes(groupId, json)));
  },

  requestHasVoted: () => ({ type: types.REQUEST_HAS_VOTED }),

  receiveHasVoted: (groupId, json) => ({
    type: types.RECEIVE_HAS_VOTED,
    id: groupId,
    value: json,
  }),

  checkVoted: groupId => dispatch => {
    dispatch(actions.requestHasVoted());
    fetch(`/api/groups/${groupId}/has-voted-for`, buildGetRequest())
      .then(response => response.json())
      .then(json => {
        dispatch(actions.receiveHasVoted(groupId, json));
      });
  },

  markGroupOrdered: groupId => dispatch => {
    fetch(`/api/groups/${groupId}/mark-ordered`, buildPostRequest())
      .then(response => {
        if (response.ok) {
          dispatch(actions.fetchOrganizedGroups());
        }
      });
  },

  markGroupComplete: groupId => dispatch => {
    fetch(`/api/groups/${groupId}/mark-complete`, buildPostRequest())
      .then(response => {
        if (response.ok) {
          dispatch(push('/'));
          dispatch(actions.fetchOrganizedGroups());
          dispatch(actions.fetchActiveGroups());
          dispatch(actions.fetchMyGroups());
        }
      });
  },
};
