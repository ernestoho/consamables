import { Map } from 'immutable';

import { RECEIVE_MY_ORDERS } from '../actions/actionTypes';

const myOrders = (state = Map(), action) => {
    switch (action.type) {
        case RECEIVE_MY_ORDERS:
            return action.myOrders;

        default:
            return state;
    }
};

export default myOrders
