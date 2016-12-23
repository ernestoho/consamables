import { Map } from 'immutable';

import { SHOW_MENU, HIDE_MENU } from '../actions/actionTypes';
import { DISPLAY_DEFAULT, DISPLAY_MENU } from '../constants';

const centerColumn = (state = Map({ display: DISPLAY_DEFAULT }), action) => {
    switch(action.type) {
        case SHOW_MENU:
            return state.set('display', DISPLAY_MENU).set('menuId', action.id);
        case HIDE_MENU:
            return state.set('display', DISPLAY_DEFAULT).delete('menuId');
        default:
            return state;
    }
}

export default centerColumn
