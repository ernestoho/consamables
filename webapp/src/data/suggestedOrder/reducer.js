import { fromJS } from 'immutable';

import { types } from './actions';

const initialState = fromJS({
  orderType: {
    delivery: false,
    carryout: false,
    outing: false,
  },
  driving: false,
  waitTime: 30,
  minPeople: 3,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_ORDER_TYPE_PREFERENCE:
      return state.updateIn(['orderType', action.orderType], v => !v);

    case types.SET_DRIVING_PREFERENCE:
      if (action.mode === 'suggest') {
        return state.set('driving', action.value);
      }
      return state;

    case types.SET_WAIT_TIME_PREFERENCE:
      if (action.mode === 'suggest') {
        return state.set('waitTime', action.value);
      }
      return state;

    case types.SET_MIN_PEOPLE_PREFERENCE:
      return state.set('minPeople', action.value);

    default:
      return state;
  }
};
