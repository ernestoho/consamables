import { fromJS } from 'immutable';

import { REQUEST_RESTAURANTS, RECEIVE_RESTAURANTS } from './actionTypes';
import fetchMenu from './menus';

const requestRestaurants = () => ({ type: REQUEST_RESTAURANTS });

const receiveRestaurants = json => ({
    type: RECEIVE_RESTAURANTS,
    restaurants: fromJS(json.reduce(
        (all, restaurant) => {
            all[restaurant.restaurantId] = restaurant;
            return all;
        },
        {}
    ))
});

const fetchRestaurants = () => {
    return dispatch => {
        dispatch(requestRestaurants());
        return fetch('/api/restaurants')
            .then( response => response.json() )
            .then(json => {
                dispatch(receiveRestaurants(json));
                json.forEach(restaurant => dispatch(fetchMenu(restaurant.restaurantId)));
            });
    }
}

export default fetchRestaurants
