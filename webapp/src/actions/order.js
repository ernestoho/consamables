import {
    START_ORDER,
    ADD_ITEM_TO_ORDER, REMOVE_ITEM_FROM_ORDER,
    INCREMENT_ITEM, DECREMENT_ITEM,
    SET_QUANTITY,
    CONTINUE_ORDER, GO_BACK_TO_MENU,
    SET_ORDER_TYPE, SET_ORDER_DURATION,
    SEND_NEW_GROUP, NEW_GROUP_SUCCESS, NEW_GROUP_FAILURE
} from './actionTypes';

export const startOrder = (restaurantId) => ({
    type: START_ORDER,
    id: restaurantId
});

export const addItemToOrder = itemId => ({
    type: ADD_ITEM_TO_ORDER,
    id: itemId
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
})

export const submitNewGroup = data => {
    return dispatch => {
        dispatch(sendNewGroup());
        return fetch('/api/groups/start', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(response => {
                if (response.ok) {
                    dispatch(newGroupSuccess());
                }
            })
            .catch( error => dispatch(newGroupFailure(error)) );
    };
};
