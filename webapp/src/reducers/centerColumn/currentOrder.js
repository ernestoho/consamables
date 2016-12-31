import { Map, List } from 'immutable';

import {
    START_ORDER,
    ADD_ITEM_TO_ORDER, REMOVE_ITEM_FROM_ORDER,
    INCREMENT_ITEM, DECREMENT_ITEM,
    SET_QUANTITY,
    CONTINUE_ORDER, SET_ORDER_TYPE, SET_ORDER_DURATION
} from '../../actions/actionTypes';

const currentOrder = (state = Map({ items: Map() }), action) => {
    switch (action.type) {
        case START_ORDER:
            // Clear items if switching restaurants
            if (state.get('items').size > 0 && state.get('restaurantId') != action.id) {
                return state.set('restaurantId', action.id)
                            .set('items', Map());
            } else {
                return state.set('restaurantId', action.id);
            }

        case ADD_ITEM_TO_ORDER:
            return state.updateIn(['items', action.id], 0, q => q + 1);

        case REMOVE_ITEM_FROM_ORDER:
            return state.deleteIn(['items', action.id]);

        case INCREMENT_ITEM:
            return state.updateIn(['items', action.id], q => q + 1);

        case DECREMENT_ITEM:
            return state.updateIn(['items', action.id], q => q - 1);

        case SET_QUANTITY:
            return state.setIn(['items', action.id], action.quantity);

        case CONTINUE_ORDER:
            return state.set(
                'options',
                Map({
                    'type': 'delivery',
                    'duration': 30
                })
            );

        case SET_ORDER_TYPE:
            return state.setIn(['options', 'type'], action.value);

        case SET_ORDER_DURATION:
            return state.setIn(['options', 'duration'], action.value);

        default:
            return state;
    }
};

export default currentOrder
