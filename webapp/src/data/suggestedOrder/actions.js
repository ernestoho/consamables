import { push } from 'react-router-redux';

import { createActionTypes, buildPostRequest, buildOrderType } from 'common/utils';

import {
  getOrderTypePreferences,
  getMinPeoplePreference,
  getWaitTimePreference,
  getDrivingPreference,
} from './selectors';

import { groupActions } from '../groups';
import { currentUserSelectors } from '../currentUser';

const { getCurrentUserId } = currentUserSelectors;

const prefix = 'SUGGESTED_ORDER';

export const types = createActionTypes([
  'SHOW_SUGGESTION',
  'HIDE_SUGGESTION',
  'TOGGLE_ORDER_TYPE_PREFERENCE',
  'SET_DRIVING_PREFERENCE',
  'SET_WAIT_TIME_PREFERENCE',
  'SET_MIN_PEOPLE_PREFERENCE',
  'SEND_SUGGESTION',
  'SUGGESTION_SUCCESS',
  'SUGGESTION_FAILURE',
  'SEND_VOTE',
  'VOTE_SUCCESS',
  'VOTE_FAILURE',
], prefix);

export const actions = {
  openSuggestOrder: restaurantId => ({
    type: types.SHOW_SUGGESTION,
    id: restaurantId,
  }),

  closeSuggestOrder: () => ({ type: types.HIDE_SUGGESTION }),

  toggleOrderTypePreference: orderType => ({
    type: types.TOGGLE_ORDER_TYPE_PREFERENCE,
    orderType,
  }),

  setDrivingPreference: (value, mode) => ({
    type: types.SET_DRIVING_PREFERENCE,
    value,
    mode,
  }),

  setWaitTimePreference: (numMinutes, mode) => ({
    type: types.SET_WAIT_TIME_PREFERENCE,
    value: numMinutes,
    mode,
  }),

  setMinPeoplePreference: numPeople => ({
    type: types.SET_MIN_PEOPLE_PREFERENCE,
    value: numPeople,
  }),

  sendSuggestion: () => ({ type: types.SEND_SUGGESTION }),

  suggestionSuccess: () => ({ type: types.SUGGESTION_SUCCESS }),

  suggestionFailure: error => ({
    type: types.SUGGESTION_FAILURE,
    error,
  }),

  submitSuggestion: restaurantId => (dispatch, getState) => {
    dispatch(actions.sendSuggestion());
    fetch('/api/groups/suggest', buildPostRequest({
      pendingGroup: {
        restaurantId,
        type: buildOrderType(getOrderTypePreferences(getState())),
        minPeople: getMinPeoplePreference(getState()),
      },
      vote: {
        userId: getCurrentUserId(getState()),
        minutesInterested: getWaitTimePreference(getState()),
        canDrive: getDrivingPreference(getState()),
      },
    }))
      .then(response => {
        if (response.ok) {
          dispatch(actions.suggestionSuccess());
          dispatch(push('/'));
          dispatch(groupActions.fetchPendingGroups(true));
        } else if (response.status === 401) {
          dispatch(actions.suggestionFailure('Logged out.'));
          dispatch(push('/login'));
        }
      })
      .catch(error => dispatch(actions.suggestionFailure(error)));
  },

  sendVote: () => ({ type: types.SEND_VOTE }),

  voteSuccess: () => ({ type: types.VOTE_SUCCESS }),

  voteFailure: error => ({
    type: types.VOTE_FAILURE,
    error,
  }),

  submitVote: groupId => (dispatch, getState) => {
    dispatch(actions.sendVote());
    fetch('/api/groups/vote', buildPostRequest({
      groupId,
      userId: getCurrentUserId(getState()),
      minutesInterested: getWaitTimePreference(getState()),
      canDrive: getDrivingPreference(getState()),
    }))
      .then(response => {
        if (response.ok) {
          dispatch(actions.voteSuccess());
          dispatch(push('/'));
          dispatch(groupActions.fetchPendingGroups(true));
        } else if (response.status === 401) {
          dispatch(actions.voteFailure('Logged out.'));
          dispatch(push('/login'));
        }
      })
      .catch(error => dispatch(actions.voteFailure(error)));
  },
};
