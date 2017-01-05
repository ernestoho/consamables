import {
    START_ORDER, JOIN_ORDER,
    ADD_ITEM_TO_ORDER, REMOVE_ITEM_FROM_ORDER,
    INCREMENT_ITEM, DECREMENT_ITEM,
    SET_QUANTITY,
    CONTINUE_ORDER, GO_BACK_TO_MENU,
    SET_ORDER_TYPE, SET_ORDER_DURATION,
    SEND_NEW_GROUP, NEW_GROUP_SUCCESS, NEW_GROUP_FAILURE,
    SEND_NEW_ORDER, NEW_ORDER_SUCCESS, NEW_ORDER_FAILURE
} from './actionTypes';

import fetchActiveOrders from './activeOrders';
import { buildPostInit } from '../helpers';
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
        fetch('/api/order/place', buildPostInit(data))
            .then(response => {
                if (response.ok) {
                    dispatch(newOrderSuccess());
                } else if (response.status == 401) {
                    dispatch(promptLogin())
                }
            })
            .catch( error => dispatch(newGroupFailure(error)) );
    };
};
