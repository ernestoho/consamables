import { SHOW_SUGGESTION, HIDE_SUGGESTION } from './actionTypes';

export const openSuggestOrder = restaurantId => ({
    type: SHOW_SUGGESTION,
    id: restaurantId
});

export const closeSuggestOrder = () => ({
    type: HIDE_SUGGESTION
});
