import { Map } from 'immutable';

import { REQUEST_RESTAURANTS, RECEIVE_RESTAURANTS } from '../actions/actionTypes';

const restaurants = (state = Map(), action) => {
    switch(action.type) {
        case RECEIVE_RESTAURANTS:
            return state.merge(action.restaurants);
        default:
            return state;
    }
};

export default restaurants
