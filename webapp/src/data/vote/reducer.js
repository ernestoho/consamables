import { Map } from 'immutable';

import { suggestedOrderActionTypes } from '../suggestedOrder';

export default (state = Map(), action) => {
  switch (action.type) {
    case suggestedOrderActionTypes.SET_DRIVING_PREFERENCE:
      if (action.mode === 'vote') {
        return state.set('driving', action.value);
      }
      return state;

    case suggestedOrderActionTypes.SET_WAIT_TIME:
      if (action.mode === 'vote') {
        return state.set('waitTime', action.value);
      }
      return state;

    default:
      return state;
  }
};
