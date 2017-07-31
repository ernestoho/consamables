import { Map } from 'immutable';

import { types } from './actions';

const initialState = Map({
  orderType: Map({
    delivery: false,
    carryout: false,
    outing: false,
  }),
  driving: false,
  waitTime: 30,
  minPeople: 3,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_DELIVERY:
      return state.updateIn(['orderType', 'delivery'], v => !v);

    case types.TOGGLE_CARRYOUT:
      return state.updateIn(['orderType', 'carryout'], v => !v);

    case types.TOGGLE_OUTING:
      return state.updateIn(['orderType', 'outing'], v => !v);

    case types.SET_DRIVING_PREFERENCE:
      if (action.mode === 'suggest') {
        return state.set('driving', action.value);
      }
      return state;

    case types.SET_WAIT_TIME:
      if (action.mode === 'suggest') {
        return state.set('waitTime', action.value);
      }
      return state;

    case types.SET_MIN_PEOPLE:
      return state.set('minPeople', action.value);

    default:
      return state;
  }
};
