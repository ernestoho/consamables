import { Map, List } from 'immutable';

import {
    START_ORDER, JOIN_ORDER,
    ADD_ITEM_TO_ORDER, REMOVE_ITEM_FROM_ORDER,
    INCREMENT_ITEM, DECREMENT_ITEM,
    SET_QUANTITY,
    CONTINUE_ORDER, SET_ORDER_TYPE, SET_ORDER_DURATION,
    SEND_NEW_GROUP, NEW_GROUP_FAILURE, NEW_GROUP_SUCCESS,
    SEND_NEW_ORDER, NEW_ORDER_FAILURE, NEW_ORDER_SUCCESS
} from '../../actions/actionTypes';

const currentOrder = (state = Map({ items: Map() }), action) => {
    let newState;

    switch (action.type) {
        case START_ORDER:
            // Clear items if switching restaurants
            if (state.get('items').size > 0 && state.get('restaurantId') != action.id) {
                newState = state.set('items', Map())
                                .set('loading', false);
            } else {
                newState = state;
            }
            return newState.set('mode', 'start')
                           .set('restaurantId', action.id)
                           .delete('groupId');

        case JOIN_ORDER:
            if (state.get('items').size > 0 && state.get('restaurantId') != action.id) {
                newState = state.set('items', Map())
                                .set('loading', false);
            } else {
                newState = state;
            }
            return newState.set('mode', 'join')
                           .set('restaurantId', action.restaurantId)
                           .set('groupId', action.groupId);

        case ADD_ITEM_TO_ORDER:
            return state.updateIn(['items', action.id, 'quantity'], 0, q => q + 1)
                        .setIn(['items', action.id, 'data'], action.data);

        case REMOVE_ITEM_FROM_ORDER:
            return state.deleteIn(['items', action.id]);

        case INCREMENT_ITEM:
            return state.updateIn(['items', action.id, 'quantity'], q => q + 1);

        case DECREMENT_ITEM:
            return state.updateIn(['items', action.id, 'quantity'], q => q - 1);

        case SET_QUANTITY:
            return state.setIn(['items', action.id, 'quantity'], action.quantity);

        case CONTINUE_ORDER:
            return state.set('options', Map({
                'type': 'delivery',
                'duration': 30
            }));

        case SET_ORDER_TYPE:
            return state.setIn(['options', 'type'], action.value);

        case SET_ORDER_DURATION:
            return state.setIn(['options', 'duration'], action.value);

        case SEND_NEW_GROUP:
        case SEND_NEW_ORDER:
            return state.set('loading', true);

        case NEW_GROUP_FAILURE:
        case NEW_ORDER_FAILURE:
            return state.set('loading', false);

        case NEW_GROUP_SUCCESS:
        case NEW_ORDER_SUCCESS:
            return state.set('items', Map())
                        .set('loading', false);

        default:
            return state;
    }
};

export default currentOrder
