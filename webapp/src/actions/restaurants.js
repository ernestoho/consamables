import { Map, fromJS } from 'immutable';
import moment from 'moment';

import { fetchMenu } from './menus';
import {
    REQUEST_RESTAURANTS, RECEIVE_RESTAURANTS,
    UPDATE_RESTAURANT_HOURS
} from './actionTypes';

const requestRestaurants = () => ({ type: REQUEST_RESTAURANTS });

const receiveRestaurants = json => ({
    type: RECEIVE_RESTAURANTS,
    restaurants: json.reduce(
        (all, restaurant) => {
            return all.set(restaurant.restaurantId, fromJS(restaurant));
        },
        Map()
    )
});

export const fetchRestaurants = () => {
    return dispatch => {
        dispatch(requestRestaurants());
        fetch('/api/restaurants')
            .then( response => response.json() )
            .then(json => {
                dispatch(receiveRestaurants(json));
                dispatch(updateRestaurantHours());
                json.forEach(restaurant => dispatch(fetchMenu(restaurant.restaurantId)));
            });
    }
}

export const updateRestaurantHours = () => ({
    type: UPDATE_RESTAURANT_HOURS,
    time: moment().valueOf()
});
