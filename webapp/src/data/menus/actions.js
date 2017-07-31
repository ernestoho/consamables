import { fromJS } from 'immutable';

import { createActionTypes } from 'common/utils';

const prefix = 'MENUS';

export const types = createActionTypes([
  'REQUEST_MENU',
  'RECEIVE_MENU',
], prefix);

export const actions = {
  requestMenu: restaurantId => ({
    type: types.REQUEST_MENU,
    id: restaurantId,
  }),

  receiveMenu: json => ({
    type: types.RECEIVE_MENU,
    menu: fromJS(json),
  }),

  fetchMenu: restaurantId => dispatch => {
    dispatch(actions.requestMenu(restaurantId));
    return fetch(`/api/restaurants/${restaurantId}/menu`)
      .then(response => response.json())
      .then(json => dispatch(actions.receiveMenu(json)));
  },
};
