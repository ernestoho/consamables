import { Map } from 'immutable';

import { menuActionTypes } from '../menus';

export default (state = Map(), action) => {
  switch (action.type) {
    case menuActionTypes.RECEIVE_MENU:
      return state.merge(
        action.menu.get('sections').reduce((items, section) => items.merge(
          section.get('items').reduce((allItems, item) => allItems.set(
            item.get('itemId'),
            item.set('restaurantId', action.menu.get('restaurantId')),
          ), Map()),
        ), Map()),
      );

    default:
      return state;
  }
};
