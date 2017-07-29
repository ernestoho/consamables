import { Map } from 'immutable';

import { SHOW_GROUP_DETAILS } from '../../actions/actionTypes';

const organizer = (state = Map(), action) => {
  switch (action.type) {
    case SHOW_GROUP_DETAILS:
      return state.set('groupId', action.id);

    default:
      return state;
  }
};

export default organizer;
