import { fromJS } from 'immutable';

import {
    REQUEST_RESTAURANTS, RECEIVE_RESTAURANTS,
    REQUEST_PENDING_ORDERS, RECEIVE_PENDING_ORDERS
} from './actionTypes';

const requestRestaurants = () => ({ type: REQUEST_RESTAURANTS });

const receiveRestaurants = (json) => ({
    type: RECEIVE_RESTAURANTS,
    restaurants: fromJS(json.reduce(
        (all, restaurant) => {
            all[restaurant.restaurantId] = restaurant;
            return all;
        },
        {}
    ))
});

export const fetchRestaurants = () => {
    return (dispatch) => {
        dispatch(requestRestaurants())
        return fetch('/api/restaurants')
            .then( response => response.json() )
            .then( json => dispatch(receiveRestaurants(json)) );
    }
}

const requestPendingOrders = () => ({ type: REQUEST_PENDING_ORDERS });

const receivePendingOrders = (json) => ({
    type: RECEIVE_PENDING_ORDERS,
    pendingOrders: fromJS(json.reduce(
        (all, order) => {
            all[order.groupId] = order;
            return all;
        },
        {}
    ))
});

export const fetchPendingOrders = () => {
    return (dispatch) => {
        dispatch(requestRestaurants())
        return fetch('/api/groups/pending')
            .then( response => response.json() )
            .then( json => dispatch(receivePendingOrders(json)) );
    }
}
