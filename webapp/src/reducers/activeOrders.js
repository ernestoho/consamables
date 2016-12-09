import { Map } from 'immutable';

import { REQUEST_ACTIVE_ORDERS, RECEIVE_ACTIVE_ORDERS } from '../actions/actionTypes';

export default (state = Map(), action) => {
    switch(action.type) {
        case RECEIVE_ACTIVE_ORDERS:
            return state.merge(action.activeOrders);
        default:
        	return state;
    }
}
