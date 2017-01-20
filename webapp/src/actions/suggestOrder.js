import 'whatwg-fetch';

import { push } from 'react-router-redux';

import {
    SHOW_SUGGESTION, HIDE_SUGGESTION,
    TOGGLE_DELIVERY, TOGGLE_CARRYOUT, TOGGLE_OUTING,
    SET_DRIVING_PREFERENCE, SET_WAIT_TIME, SET_MIN_PEOPLE,
    SEND_SUGGESTION, SUGGESTION_SUCCESS, SUGGESTION_FAILURE,
    SEND_VOTE, VOTE_SUCCESS, VOTE_FAILURE
} from './actionTypes';

import fetchPendingOrders from './pendingOrders';
import { buildPostInit } from '../helpers';

export const openSuggestOrder = restaurantId => ({
    type: SHOW_SUGGESTION,
    id: restaurantId
});

export const closeSuggestOrder = () => ({
    type: HIDE_SUGGESTION
});

export const toggleDelivery = () => ({
    type: TOGGLE_DELIVERY
});

export const toggleCarryout = () => ({
    type: TOGGLE_CARRYOUT
});

export const toggleOuting = () => ({
    type: TOGGLE_OUTING
});

export const setDrivingPreference = (value, mode) => ({
    type: SET_DRIVING_PREFERENCE,
    value: value,
    mode: mode
});

export const setWaitTime = (numMinutes, mode) => ({
    type: SET_WAIT_TIME,
    value: numMinutes,
    mode: mode
});

export const setMinPeople = numPeople => ({
    type: SET_MIN_PEOPLE,
    value: numPeople
});

const sendSuggestion = () => ({ type: SEND_SUGGESTION });

const suggestionSuccess = () => ({ type: SUGGESTION_SUCCESS });

const suggestionFailure = error => ({
    type: SUGGESTION_FAILURE,
    error: error
});

export const submitSuggestion = data => {
    return dispatch => {
        dispatch(sendSuggestion());
        fetch('/api/groups/suggest', buildPostInit(data))
            .then(response => {
                if (response.ok) {
                    dispatch(suggestionSuccess());
                    dispatch(push('/'));
                    dispatch(fetchPendingOrders(true));
                } else if (response.status == 401) {
                    dispatch(suggestionFailure('Logged out.'));
                    dispatch(push('/login'));
                }
            })
            .catch( error => dispatch(suggestionFailure(error)) );
    }
};

const sendVote = () => ({ type: SEND_VOTE });

const voteSuccess = () => ({ type: VOTE_SUCCESS });

const voteFailure = error => ({
    type: VOTE_FAILURE,
    error: error
});

export const submitVote = data => {
    return dispatch => {
        fetch('/api/groups/vote', buildPostInit(data))
            .then(response => {
                if (response.ok) {
                    dispatch(voteSuccess());
                    dispatch(push('/'));
                    dispatch(fetchPendingOrders(true));
                } else if (response.status == 401) {
                    dispatch(voteFailure('Logged out.'));
                    dispatch(push('/login'));
                }
            })
            .catch( error => dispatch(voteFailure(error)));
    }
};
