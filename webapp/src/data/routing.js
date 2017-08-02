import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = { locationBeforeTransitions: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return { ...state, locationBeforeTransitions: action.payload };

    default:
      return state;
  }
};

export const selectLocationState = state => state.get('routing');
