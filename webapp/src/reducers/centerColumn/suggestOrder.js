import { Map } from 'immutable';

import {
    TOGGLE_DELIVERY, TOGGLE_CARRYOUT, TOGGLE_OUTING,
    SET_DRIVING_PREFERENCE, SET_WAIT_TIME, SET_MIN_PEOPLE
} from '../../actions/actionTypes';

const initialState = Map({
    orderType: Map({
        delivery: false,
        carryout: false,
        outing: false
    }),
    driving: false,
    waitTime: 30,
    minPeople: 3
});

const suggestOrder = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_DELIVERY:
            return state.updateIn(['orderType', 'delivery'], v => !v);

        case TOGGLE_CARRYOUT:
            return state.updateIn(['orderType', 'carryout'], v => !v);

        case TOGGLE_OUTING:
            return state.updateIn(['orderType', 'outing'], v => !v);

        case SET_DRIVING_PREFERENCE:
            if (action.mode == 'suggest') {
                return state.set('driving', action.value);
            }
            return state;

        case SET_WAIT_TIME:
            if (action.mode == 'suggest') {
                return state.set('waitTime', action.value);
            }
            return state;

        case SET_MIN_PEOPLE:
            return state.set('minPeople', action.value);

        default:
            return state;
    }
};

export default suggestOrder
