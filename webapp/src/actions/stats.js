import 'whatwg-fetch';

import {
    REQUEST_VOTES, RECEIVE_VOTES,
    REQUEST_NUM_ORDERS, RECEIVE_NUM_ORDERS
} from './actionTypes';

const requestVotes = groupId => ({
    type: REQUEST_VOTES,
    id: groupId
});

const receiveVotes = (groupId, json) => ({
    type: RECEIVE_VOTES,
    id: groupId,
    value: json
});

export const fetchVotes = groupId => {
    return dispatch => {
        dispatch(requestVotes(groupId));
        fetch(`/api/groups/${groupId}/count-votes`)
            .then( response => response.json() )
            .then( json => dispatch(receiveVotes(groupId, json)) );
    };
};

const requestNumOrders = groupId => ({
    type: RECEIVE_NUM_ORDERS,
    id: groupId
});

const receiveNumOrders = (groupId, json) => ({
    type: RECEIVE_NUM_ORDERS,
    id: groupId,
    value: json
});

export const fetchNumOrders = groupId => {
    return dispatch => {
        dispatch(requestNumOrders(groupId));
        fetch(`/api/groups/${groupId}/count-orders`)
            .then( response => response.json() )
            .then( json => dispatch(receiveNumOrders(groupId, json)) );
    };
};
