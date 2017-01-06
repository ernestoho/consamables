import 'whatwg-fetch';
import { Map, List, fromJS } from 'immutable';

import {
    START_ORDER, JOIN_ORDER,
    ADD_ITEM_TO_ORDER, REMOVE_ITEM_FROM_ORDER,
    INCREMENT_ITEM, DECREMENT_ITEM,
    SET_QUANTITY,
    CONTINUE_ORDER, GO_BACK_TO_MENU,
    SET_ORDER_TYPE, SET_ORDER_DURATION,
    SEND_NEW_GROUP, NEW_GROUP_SUCCESS, NEW_GROUP_FAILURE,
    SEND_NEW_ORDER, NEW_ORDER_SUCCESS, NEW_ORDER_FAILURE,
    REQUEST_MY_ORDERS, RECEIVE_MY_ORDERS,
    SHOW_ORDER_DETAILS, HIDE_ORDER_DETAILS
} from './actionTypes';

import fetchActiveOrders from './activeOrders';
import { fetchOrganizedOrders } from './organizer';
import { buildPostInit, buildGetInit } from '../helpers';
import { promptLogin } from './login';

export const startOrder = restaurantId => ({
    type: START_ORDER,
    id: restaurantId
});

export const joinOrder = (restaurantId, groupId) => ({
    type: JOIN_ORDER,
    restaurantId: restaurantId,
    groupId: groupId
});

export const addItemToOrder = (itemId, data) => ({
    type: ADD_ITEM_TO_ORDER,
    id: itemId,
    data: data
});

export const removeItemFromOrder = itemId => ({
    type: REMOVE_ITEM_FROM_ORDER,
    id: itemId
});

export const incrementItem = itemId => ({
    type: INCREMENT_ITEM,
    id: itemId
});

export const decrementItem = itemId => ({
    type: DECREMENT_ITEM,
    id: itemId
});

export const setQuantity = (itemId, quantity) => ({
    type: SET_QUANTITY,
    id: itemId,
    quantity: quantity
});

export const continueOrder = () => ({ type: CONTINUE_ORDER });

export const goBackToMenu = () => ({ type: GO_BACK_TO_MENU });

export const setOrderType = orderType => ({
    type: SET_ORDER_TYPE,
    value: orderType
});

export const setOrderDuration = numMinutes => ({
    type: SET_ORDER_DURATION,
    value: numMinutes
});

const sendNewGroup = () => ({ type: SEND_NEW_GROUP });

const newGroupSuccess = () => ({ type: NEW_GROUP_SUCCESS });

const newGroupFailure = error => ({
    type: NEW_GROUP_FAILURE,
    error: error
});

export const submitNewGroup = data => {
    return dispatch => {
        dispatch(sendNewGroup());
        fetch('/api/groups/start', buildPostInit(data))
            .then(response => {
                if (response.ok) {
                    dispatch(newGroupSuccess());
                    dispatch(fetchActiveOrders());
                    dispatch(fetchOrganizedOrders());
                } else if (response.status == 401) {
                    dispatch(promptLogin());
                }
            })
            .catch( error => dispatch(newGroupFailure(error)) );
    };
};

const sendNewOrder = () => ({ type: SEND_NEW_ORDER });

const newOrderSuccess = () => ({ type: NEW_ORDER_SUCCESS });

const newOrderFailure = error => ({
    type: NEW_ORDER_FAILURE,
    error: error
});

export const submitNewOrder = data => {
    return dispatch => {
        dispatch(sendNewOrder());
        fetch('/api/orders/place', buildPostInit(data))
            .then(response => {
                if (response.ok) {
                    dispatch(newOrderSuccess());
                    dispatch(fetchMyOrders());
                } else if (response.status == 401) {
                    dispatch(promptLogin())
                }
            })
            .catch( error => dispatch(newGroupFailure(error)) );
    };
};

const requestMyOrders = () => ({ type: REQUEST_MY_ORDERS });

const receiveMyOrders = json => ({
    type: RECEIVE_MY_ORDERS,
    myOrders: json.reduce((all, order) => {
        return all.set(order.orderId, Map({ groupId: order.groupId }))
            .updateIn(
                [order.orderId, 'orderItems'],
                List(),
                orderItems => orderItems.concat(fromJS(order.orderItems))
            );
    }, Map())
});

export const fetchMyOrders = () => {
    return dispatch => {
        fetch('/api/orders/my-orders', buildGetInit())
            .then(response => {
                response.json().then(json => {
                    if (response.ok) {
                        dispatch(receiveMyOrders(json));
                    } else if (response.status == 401) {
                        dispatch(promptLogin());
                    }
                })
            });
    };
};

export const showOrderDetails = orderId => ({
    type: SHOW_ORDER_DETAILS,
    id: orderId
});

export const hideOrderDetails = () => ({ type: HIDE_ORDER_DETAILS });
