import {
    SHOW_SUGGESTION, HIDE_SUGGESTION,
    TOGGLE_DELIVERY, TOGGLE_CARRYOUT, TOGGLE_OUTING,
    SET_DRIVING_PREFERENCE, SET_WAIT_TIME
} from './actionTypes';

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

export const setDrivingPreference = value => ({
    type: SET_DRIVING_PREFERENCE,
    value: value
});

export const setWaitTime = numMinutes => ({
    type: SET_WAIT_TIME,
    value: numMinutes
});
