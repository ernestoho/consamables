import { Map, fromJS } from 'immutable';
import moment from 'moment';

import { createActionTypes } from 'common/utils';

import { menuActions } from '../menus';

const prefix = 'RESTAURANTS';

export const types = createActionTypes([
  'REQUEST_RESTAURANTS',
  'RECEIVE_RESTAURANTS',
  'UPDATE_RESTAURANT_HOURS',
], prefix);

export const actions = {
  requestRestaurants: () => ({ type: types.REQUEST_RESTAURANTS }),

  receiveRestaurants: json => ({
    type: types.RECEIVE_RESTAURANTS,
    restaurants: json.reduce(
      (all, restaurant) => all.set(restaurant.restaurantId, fromJS(restaurant)),
      Map(),
    ),
  }),

  fetchRestaurants: () => dispatch => {
    dispatch(actions.requestRestaurants());
    fetch('/api/restaurants')
      .then(response => response.json())
      .then(json => {
        dispatch(actions.receiveRestaurants(json));
        dispatch(actions.updateRestaurantHours());
        json.forEach(restaurant => dispatch(menuActions.fetchMenu(restaurant.restaurantId)));
      });
  },

  updateRestaurantHours: () => ({
    type: types.UPDATE_RESTAURANT_HOURS,
    time: moment().valueOf(),
  }),
};
