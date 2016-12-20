import { Map } from 'immutable';

import { REQUEST_PENDING_ORDERS, RECEIVE_PENDING_ORDERS } from '../actions/actionTypes';

const pendingOrders = (state = Map(), action) => {
    switch(action.type) {
        case RECEIVE_PENDING_ORDERS:
            return state.merge(action.pendingOrders);
        default:
        	return state;
    }
};

export default pendingOrders
