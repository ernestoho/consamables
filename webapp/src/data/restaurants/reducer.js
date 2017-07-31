import { Map } from 'immutable';

import { calculateHours } from 'common/utils';

import { types } from './actions';

export default (state = Map(), action) => {
  switch (action.type) {
    case types.RECEIVE_RESTAURANTS:
      return state.merge(action.restaurants);

    case types.UPDATE_RESTAURANT_HOURS:
      return state.map(restaurant => restaurant.merge(
        calculateHours(action.time, restaurant.get('hours').toJS()),
      ));

    default:
      return state;
  }
};
