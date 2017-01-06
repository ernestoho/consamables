import { Map } from 'immutable';

import { REQUEST_ORGANIZED_ORDERS, RECEIVE_ORGANIZED_ORDERS } from '../actions/actionTypes';

const organizedOrders = (state = Map(), action) => {
    switch (action.type) {
        case RECEIVE_ORGANIZED_ORDERS:
            return action.organizedOrders;
        default:
            return state;
    }
};

export default organizedOrders
