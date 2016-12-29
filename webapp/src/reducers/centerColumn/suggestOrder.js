import { Map } from 'immutable';

import {
    SHOW_SUGGESTION,
    TOGGLE_DELIVERY, TOGGLE_CARRYOUT, TOGGLE_OUTING,
    SET_DRIVING_PREFERENCE, SET_WAIT_TIME
} from '../../actions/actionTypes';

const suggestOrder = (state = Map(), action) => {
    switch (action.type) {
        case SHOW_SUGGESTION:
            return state.set('restaurantId', action.id)
                        .set(
                            'orderType',
                            Map({
                                'delivery': false,
                                'carryout': false,
                                'outing': false
                            })
                        )
                        .set('driving', false)
                        .set('waitTime', 30);

        case TOGGLE_DELIVERY:
            return state.updateIn(['orderType', 'delivery'], v => !v);

        case TOGGLE_CARRYOUT:
            return state.updateIn(['orderType', 'carryout'], v => !v);

        case TOGGLE_OUTING:
            return state.updateIn(['orderType', 'outing'], v => !v);

        case SET_DRIVING_PREFERENCE:
            return state.set('driving', action.value);

        case SET_WAIT_TIME:
            return state.set('waitTime', action.value);

        default:
            return state;
    }
};

export default suggestOrder
