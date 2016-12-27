import { Map, fromJS } from 'immutable';

import {
    SHOW_MENU, HIDE_MENU,
    START_ORDER,
    ADD_ITEM_TO_ORDER, REMOVE_ITEM_FROM_ORDER,
    INCREMENT_ITEM, DECREMENT_ITEM,
    SET_QUANTITY
} from '../actions/actionTypes';

import {
    DISPLAY_DEFAULT,
    DISPLAY_MENU_VIEWING,
    DISPLAY_MENU_ORDERING,
    DISPLAY_MENU_WITH_ORDER
} from '../constants';

const centerColumn = (state = Map({ display: DISPLAY_DEFAULT }), action) => {
    switch(action.type) {
        case SHOW_MENU:
            return state.set('display', DISPLAY_MENU_VIEWING)
                        .set('menuId', action.id);

        case HIDE_MENU:
            return state.set('display', DISPLAY_DEFAULT)
                        .delete('menuId');

        case START_ORDER:
            return state.set('display', DISPLAY_MENU_ORDERING)
                        .set('menuId', action.id)
                        .delete('orderItems');

        case ADD_ITEM_TO_ORDER:
            return state.set('display', DISPLAY_MENU_WITH_ORDER)
                        .updateIn(['orderItems', action.id], 0, q => q + 1);

        case REMOVE_ITEM_FROM_ORDER:
            if (state.get('orderItems').size == 1 && state.get('orderItems').has(action.id)) {
                return state.set('display', DISPLAY_MENU_ORDERING)
                            .delete('orderItems');
            } else {
                return state.deleteIn(['orderItems', action.id]);
            }

        case INCREMENT_ITEM:
            return state.updateIn(['orderItems', action.id], q => q + 1);

        case DECREMENT_ITEM:
            return state.updateIn(['orderItems', action.id], q => q - 1);

        case SET_QUANTITY:
            return state.setIn(['orderItems', action.id], action.quantity);

        default:
            return state;
    }
};

export default centerColumn
