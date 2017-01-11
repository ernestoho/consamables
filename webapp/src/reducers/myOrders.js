import { Map } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import { RECEIVE_MY_ORDERS } from '../actions/actionTypes';

const myOrders = (state = Map(), action) => {
    switch (action.type) {
        case RECEIVE_MY_ORDERS:
            return action.myOrders;

        case LOCATION_CHANGE:
            if (action.payload.pathname == '/login') {
                return state.clear();
            }
            return state;

        default:
            return state;
    }
};

export default myOrders
