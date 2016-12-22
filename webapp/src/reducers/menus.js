import { Map } from 'immutable';

import { REQUEST_MENU, RECEIVE_MENU } from '../actions/actionTypes';

const menus = (state = Map(), action) => {
    switch(action.type) {
        case RECEIVE_MENU:
            return state.set(action.menu.get('restaurantId'), action.menu.get('sections'));
        default:
            return state;
    }
};

export default menus
