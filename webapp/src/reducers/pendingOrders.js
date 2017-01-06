import { Map } from 'immutable';

import {
    REQUEST_PENDING_ORDERS, RECEIVE_PENDING_ORDERS,
    RECEIVE_VOTES
} from '../actions/actionTypes';

const pendingOrders = (state = Map(), action) => {
    switch (action.type) {
        case RECEIVE_PENDING_ORDERS:
            return action.pendingOrders;

        case RECEIVE_VOTES:
            return state.setIn([action.id, 'votes'], action.value);

        default:
        	return state;
    }
};

export default pendingOrders
