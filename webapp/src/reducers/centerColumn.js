import { Map, fromJS } from 'immutable';

import { SHOW_MENU, HIDE_MENU, ADD_ITEM_TO_ORDER } from '../actions/actionTypes';
import {
    DISPLAY_DEFAULT,
    DISPLAY_MENU_VIEWING,
    DISPLAY_MENU_WITH_ORDER
} from '../constants';

const centerColumn = (state = Map({ display: DISPLAY_DEFAULT }), action) => {
    switch(action.type) {
        case SHOW_MENU:
            return state.set('display', DISPLAY_MENU_VIEWING).set('menuId', action.id);
        case HIDE_MENU:
            return state.set('display', DISPLAY_DEFAULT).delete('menuId');
        case ADD_ITEM_TO_ORDER:
            return state.set('display', DISPLAY_MENU_WITH_ORDER)
                        .updateIn(['orderItems', action.id], 0, q => q + 1);
        default:
            return state;
    }
}

export default centerColumn
