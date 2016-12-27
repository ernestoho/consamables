import { SHOW_SUGGESTION } from './actionTypes';

export const suggestOrder = restaurantId => ({
    type: SHOW_SUGGESTION,
    id: restaurantId
});
