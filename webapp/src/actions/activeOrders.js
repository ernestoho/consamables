import { Map, fromJS } from 'immutable';
import 'whatwg-fetch';

import { REQUEST_ACTIVE_ORDERS, RECEIVE_ACTIVE_ORDERS } from './actionTypes';

const requestActiveOrders = () => ({ type: REQUEST_ACTIVE_ORDERS });

const receiveActiveOrders = json => ({
    type: RECEIVE_ACTIVE_ORDERS,
    activeOrders: json.reduce(
        (all, order) => {
            return all.set(order.groupId, fromJS(order));
        },
        Map()
    )
});

const fetchActiveOrders = () => {
    return dispatch => {
        dispatch(requestActiveOrders());
        fetch('/api/groups/active')
            .then( response => response.json() )
            .then( json => dispatch(receiveActiveOrders(json)) );
    }
}

export default fetchActiveOrders
