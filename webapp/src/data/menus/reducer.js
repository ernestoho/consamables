import { Map } from 'immutable';

import { types } from './actions';

export default (state = Map(), action) => {
  switch (action.type) {
    case types.RECEIVE_MENU:
      return state.set(action.menu.get('restaurantId'), action.menu.get('sections'));

    default:
      return state;
  }
};
