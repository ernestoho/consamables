import { fromJS } from 'immutable';

import { REQUEST_ACTIVE_ORDERS, RECEIVE_ACTIVE_ORDERS } from './actionTypes';

const requestActiveOrders = () => ({ type: REQUEST_ACTIVE_ORDERS });

const receiveActiveOrders = (json) => ({
    type: RECEIVE_ACTIVE_ORDERS,
    activeOrders: fromJS(json.reduce(
        (all, order) => {
            all[order.groupId] = order;
            return all;
        },
        {}
    ))
});

const fetchActiveOrders = () => {
    return (dispatch) => {
        dispatch(requestRestaurants());
        return fetch('/api/groups/active')
            .then( response => response.json() )
            .then( json => dispatch(receiveActiveOrders(json)) );
    }
}

export default fetchActiveOrders
