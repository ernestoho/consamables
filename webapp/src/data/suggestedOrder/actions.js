import { push } from 'react-router-redux';

import { createActionTypes, buildPostRequest } from 'common/utils';

import { groupActions } from '../groups';

const prefix = 'SUGGESTED_ORDER';

export const types = createActionTypes([
  'SHOW_SUGGESTION',
  'HIDE_SUGGESTION',
  'TOGGLE_DELIVERY',
  'TOGGLE_CARRYOUT',
  'TOGGLE_OUTING',
  'SET_DRIVING_PREFERENCE',
  'SET_WAIT_TIME',
  'SET_MIN_PEOPLE',
  'SEND_SUGGESTION',
  'SUGGESTION_SUCCESS',
  'SUGGESTION_FAILURE',
], prefix);

export const actions = {
  openSuggestOrder: restaurantId => ({
    type: types.SHOW_SUGGESTION,
    id: restaurantId,
  }),

  closeSuggestOrder: () => ({ type: types.HIDE_SUGGESTION }),

  toggleDelivery: () => ({ type: types.TOGGLE_DELIVERY }),

  toggleCarryout: () => ({ type: types.TOGGLE_CARRYOUT }),

  toggleOuting: () => ({ type: types.TOGGLE_OUTING }),

  setDrivingPreference: (value, mode) => ({
    type: types.SET_DRIVING_PREFERENCE,
    value,
    mode,
  }),

  setWaitTime: (numMinutes, mode) => ({
    type: types.SET_WAIT_TIME,
    value: numMinutes,
    mode,
  }),

  setMinPeople: numPeople => ({
    type: types.SET_MIN_PEOPLE,
    value: numPeople,
  }),

  sendSuggestion: () => ({ type: types.SEND_SUGGESTION }),

  suggestionSuccess: () => ({ type: types.SUGGESTION_SUCCESS }),

  suggestionFailure: error => ({
    type: types.SUGGESTION_FAILURE,
    error,
  }),

  submitSuggestion: data => dispatch => {
    dispatch(actions.sendSuggestion());
    fetch('/api/groups/suggest', buildPostRequest(data))
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
};
