import { push } from 'react-router-redux';

import { createActionTypes, buildPostRequest } from 'common/utils';

import { groupActions } from '../groups';

import {
  getOrderType,
  getOrderDuration,
  getOrderOverhead,
  getOrderItemsToSubmit,
} from './selectors';

import { currentUserSelectors } from '../currentUser';

const {
  fetchActiveGroups,
  fetchPendingGroups,
  fetchMyGroups,
  fetchOrganizedGroups,
} = groupActions;

const { getCurrentUserId } = currentUserSelectors;

const prefix = 'CURRENT_ORDER';

export const types = createActionTypes([
  'START_ORDER',
  'JOIN_ORDER',
  'ACTIVATE_ORDER',
  'ADD_ITEM_TO_ORDER',
  'REMOVE_ITEM_FROM_ORDER',
  'INCREMENT_ITEM',
  'DECREMENT_ITEM',
  'SET_QUANTITY',
  'CONTINUE_ORDER',
  'GO_BACK_TO_MENU',
  'SET_ORDER_TYPE',
  'SET_ORDER_DURATION',
  'SET_OVERHEAD',
  'SEND_NEW_GROUP',
  'NEW_GROUP_FAILURE',
  'NEW_GROUP_SUCCESS',
  'SEND_NEW_ORDER',
  'NEW_ORDER_FAILURE',
  'NEW_ORDER_SUCCESS',
  'SEND_ACTIVATED_GROUP',
  'ACTIVATED_GROUP_FAILURE',
  'ACTIVATED_GROUP_SUCCESS',
], prefix);

export const actions = {
  startOrder: restaurantId => ({
    type: types.START_ORDER,
    restaurantId,
  }),

  joinOrder: (restaurantId, groupId) => ({
    type: types.JOIN_ORDER,
    restaurantId,
    groupId,
  }),

  activateOrder: (restaurantId, groupId) => ({
    type: types.ACTIVATE_ORDER,
    restaurantId,
    groupId,
  }),

  addItemToOrder: (itemId, data) => ({
    type: types.ADD_ITEM_TO_ORDER,
    id: itemId,
    data,
  }),

  removeItemFromOrder: index => ({
    type: types.REMOVE_ITEM_FROM_ORDER,
    index,
  }),

  incrementItem: index => ({
    type: types.INCREMENT_ITEM,
    index,
  }),

  decrementItem: index => ({
    type: types.DECREMENT_ITEM,
    index,
  }),

  setQuantity: (index, quantity) => ({
    type: types.SET_QUANTITY,
    index,
    quantity,
  }),

  continueOrder: () => ({ type: types.CONTINUE_ORDER }),

  goBackToMenu: () => ({ type: types.GO_BACK_TO_MENU }),

  setOrderType: orderType => ({
    type: types.SET_ORDER_TYPE,
    value: orderType,
  }),

  setOrderDuration: numMinutes => ({
    type: types.SET_ORDER_DURATION,
    value: numMinutes,
  }),

  setOrderOverhead: percent => ({
    type: types.SET_OVERHEAD,
    value: percent,
  }),

  sendNewGroup: () => ({ type: types.SEND_NEW_GROUP }),

  newGroupSuccess: () => ({ type: types.NEW_GROUP_SUCCESS }),

  newGroupFailure: error => ({
    type: types.NEW_GROUP_FAILURE,
    error,
  }),

  submitNewGroup: restaurantId => (dispatch, getState) => {
    dispatch(actions.sendNewGroup());
    fetch('/api/groups/start', buildPostRequest({
      activeGroup: {
        restaurantId,
        type: getOrderType(getState()),
        durationMinutes: getOrderDuration(getState()),
        organizerId: getCurrentUserId(getState()),
        overheadPercentage: getOrderOverhead(getState()) * 0.01,
      },
      order: {
        userId: getCurrentUserId(getState()),
        orderItems: getOrderItemsToSubmit(getState()).toJS(),
      },
    }))
      .then(response => {
        if (response.ok) {
          dispatch(actions.newGroupSuccess());
          dispatch(push('/'));
          dispatch(fetchActiveGroups());
          dispatch(fetchOrganizedGroups());
        } else if (response.status === 401) {
          dispatch(actions.newGroupFailure('Logged out.'));
          dispatch(push('/login'));
        }
      })
      .catch(error => dispatch(actions.newGroupFailure(error)));
  },

  sendNewOrder: () => ({ type: types.SEND_NEW_ORDER }),

  newOrderSuccess: () => ({ type: types.NEW_ORDER_SUCCESS }),

  newOrderFailure: error => ({
    type: types.NEW_ORDER_FAILURE,
    error,
  }),

  submitNewOrder: groupId => (dispatch, getState) => {
    dispatch(actions.sendNewOrder());
    fetch('/api/groups/join', buildPostRequest({
      groupId,
      userId: getCurrentUserId(getState()),
      orderItems: getOrderItemsToSubmit(getState()).toJS(),
    }))
      .then(response => {
        if (response.ok) {
          dispatch(actions.newOrderSuccess());
          dispatch(push('/'));
          dispatch(fetchMyGroups());
        } else if (response.status === 401) {
          dispatch(actions.newOrderFailure('Logged out.'));
          dispatch(push('/login'));
        }
      })
      .catch(error => dispatch(actions.newGroupFailure(error)));
  },

  sendActivatedGroup: () => ({ type: types.SEND_ACTIVATED_GROUP }),

  activatedGroupSuccess: () => ({ type: types.ACTIVATED_GROUP_SUCCESS }),

  activatedGroupFailure: error => ({
    type: types.ACTIVATED_GROUP_FAILURE,
    error,
  }),

  submitActivatedGroup: groupId => (dispatch, getState) => {
    dispatch(actions.sendActivatedGroup());
    fetch('/api/groups/activate', buildPostRequest({
      activeGroup: {
        groupId,
        type: getOrderType(getState()),
        durationMinutes: getOrderDuration(getState()),
        organizerId: getCurrentUserId(getState()),
      },
      order: {
        groupId,
        userId: getCurrentUserId(getState()),
        orderItems: getOrderItemsToSubmit(getState()).toJS(),
      },
    }))
      .then(response => {
        if (response.ok) {
          dispatch(actions.activatedGroupSuccess());
          dispatch(push('/'));
          dispatch(fetchOrganizedGroups());
          dispatch(fetchActiveGroups());
          dispatch(fetchPendingGroups());
        } else if (response.status === 401) {
          dispatch(actions.activatedGroupFailure('Logged out.'));
          dispatch(push('/login'));
        }
      })
      .catch(error => dispatch(actions.activatedGroupFailure(error)));
  },
};
