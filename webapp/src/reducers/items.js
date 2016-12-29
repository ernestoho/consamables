import { Map } from 'immutable';

import { RECEIVE_MENU } from '../actions/actionTypes';

const items = (state = Map(), action) => {
    switch (action.type) {
        case RECEIVE_MENU:
            return state.merge(
                action.menu.get('sections').reduce((items, section) => {
                    return items.merge(section.get('items').reduce((items, item) => {
                        return items.set(
                            item.get('itemId'),
                            item.set('restaurantId', action.menu.get('restaurantId'))
                        );
                    }, Map()));
                }, Map())
            );
        default:
            return state;
    }
};

export default items