import { fromJS } from 'immutable';

import { REQUEST_PENDING_ORDERS, RECEIVE_PENDING_ORDERS } from './actionTypes';

const requestPendingOrders = () => ({ type: REQUEST_PENDING_ORDERS });

const receivePendingOrders = json => ({
    type: RECEIVE_PENDING_ORDERS,
    pendingOrders: fromJS(json.reduce(
        (all, order) => {
            all[order.groupId] = order;
            return all;
        },
        {}
    ))
});

const fetchPendingOrders = () => {
    return dispatch => {
        dispatch(requestPendingOrders());
        return fetch('/api/groups/pending')
            .then( response => response.json() )
            .then( json => dispatch(receivePendingOrders(json)) );
    }
}

export default fetchPendingOrders
