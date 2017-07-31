import { Map } from 'immutable';

import { types } from '../actions';

export default (state = Map(), action) => {
  switch (action.type) {
    case types.RECEIVE_PENDING_GROUPS:
      return action.pendingGroups;

    case types.RECEIVE_VOTES:
      return state.setIn([action.id, 'votes'], action.value);

    case types.RECEIVE_HAS_VOTED:
      return state.setIn([action.id, 'hasVoted'], action.value);

    default:
      return state;
  }
};
