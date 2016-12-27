import { Map } from 'immutable';

import { calculateHours } from '../helpers';
import {
    REQUEST_RESTAURANTS, RECEIVE_RESTAURANTS,
    UPDATE_RESTAURANT_HOURS
} from '../actions/actionTypes';

const restaurants = (state = Map(), action) => {
    switch(action.type) {
        case RECEIVE_RESTAURANTS:
            return state.merge(action.restaurants);

        case UPDATE_RESTAURANT_HOURS:
            return state.map(restaurant => restaurant.merge(
                calculateHours(action.time, restaurant.get('hours').toJS())
            ));

        default:
            return state;
    }
};

export default restaurants
