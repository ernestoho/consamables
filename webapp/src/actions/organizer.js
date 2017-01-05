import 'whatwg-fetch';

import { Map, fromJS } from 'immutable';

import {
    REQUEST_ORGANIZED_ORDERS, RECEIVE_ORGANIZED_ORDERS,
    SHOW_GROUP_DETAILS, HIDE_GROUP_DETAILS
} from './actionTypes';
import { buildPostInit, buildGetInit } from '../helpers';
import { promptLogin } from './login';
import { fetchUsername } from './users';

const requestOrganizedOrders = () => ({ type: REQUEST_ORGANIZED_ORDERS });

const receiveOrganizedOrders = json => ({
    type: RECEIVE_ORGANIZED_ORDERS,
    organizedOrders: json.reduce(
        (all, order) => {
            return all.set(order.groupId, fromJS(order));
        },
        Map()
    )
});

export const fetchOrganizedOrders = () => {
    return dispatch => {
        fetch('/api/groups/organized', buildGetInit())
            .then(response => {
                response.json().then(json => {
                    if (response.ok) {
                        dispatch(receiveOrganizedOrders(json));
                        json.forEach(group => {
                            group.orders.forEach(order => {
                                dispatch(fetchUsername(order.userId));
                            });
                        });
                    } else {
                        dispatch(promptLogin());
                    }
                });
            });
    }
}

export const showGroupDetails = groupId => ({
    type: SHOW_GROUP_DETAILS,
    id: groupId
});

export const hideGroupDetails = () => ({ type: HIDE_GROUP_DETAILS });
