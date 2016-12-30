import {
    SHOW_SUGGESTION, HIDE_SUGGESTION,
    TOGGLE_DELIVERY, TOGGLE_CARRYOUT, TOGGLE_OUTING,
    SET_DRIVING_PREFERENCE, SET_WAIT_TIME, SET_MIN_PEOPLE,
    SEND_SUGGESTION, SUGGESTION_SUCCESS, SUGGESTION_FAILURE
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

export const setMinPeople = numPeople => ({
    type: SET_MIN_PEOPLE,
    value: numPeople
});

const sendSuggestion = () => ({ type: SEND_SUGGESTION });

const suggestionSuccess = () => ({ type: SUGGESTION_SUCCESS });

const suggestionFailure = error => ({
    type: SUGGESTION_FAILURE,
    error: error
})

export const submitSuggestion = data => {
    return dispatch => {
        dispatch(sendSuggestion());
        return fetch('/api/groups/suggest', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(response => {
                if (response.ok()) {
                    dispatch(suggestionSuccess());
                }
            })
            .catch( error => dispatch(suggestionFailure(error)) );
    }
};
