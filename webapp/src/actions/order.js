import {
    ADD_ITEM_TO_ORDER, REMOVE_ITEM_FROM_ORDER,
    INCREMENT_ITEM, DECREMENT_ITEM,
    SET_QUANTITY
} from './actionTypes';

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
