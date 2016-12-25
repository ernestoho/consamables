import { ADD_ITEM_TO_ORDER, REMOVE_ITEM_FROM_ORDER } from './actionTypes';

export const addItemToOrder = itemId => ({
    type: ADD_ITEM_TO_ORDER,
    id: itemId
});

export const removeItemFromOrder = itemId => ({
    type: REMOVE_ITEM_FROM_ORDER,
    id: itemId
});
