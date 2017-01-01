import { Map, fromJS } from 'immutable';

import { REQUEST_PENDING_ORDERS, RECEIVE_PENDING_ORDERS } from './actionTypes';
import fetchVotes from './votes';

const requestPendingOrders = () => ({ type: REQUEST_PENDING_ORDERS });

const receivePendingOrders = json => ({
    type: RECEIVE_PENDING_ORDERS,
    pendingOrders: json.reduce(
        (all, order) => {
            return all.set(order.groupId, fromJS(order).set('votes', 0));
        },
        Map()
    )
});

const fetchPendingOrders = () => {
    return dispatch => {
        dispatch(requestPendingOrders());
        return fetch('/api/groups/pending')
            .then( response => response.json() )
            .then(json => {
                dispatch(receivePendingOrders(json));
                json.forEach(group => dispatch(fetchVotes(group.groupId)));
            });
    }
}

export default fetchPendingOrders
