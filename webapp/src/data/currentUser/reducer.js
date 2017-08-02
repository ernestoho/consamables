import { Map } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import { loginActionTypes } from '../login';

export default (state = Map({ loggedIn: false }), action) => {
  switch (action.type) {
    case loginActionTypes.LOGIN_SUCCESS:
    case loginActionTypes.NEW_ACCOUNT_SUCCESS:
    case loginActionTypes.SET_USER_INFO:
      return state
        .set('loggedIn', true)
        .set('userId', action.id)
        .set('username', action.username)
        .set('splitwiseAuth', action.splitwiseAuth);

    case LOCATION_CHANGE:
      if (action.payload.pathname === '/login') {
        return state
          .set('loggedIn', false)
          .delete('userId')
          .delete('username')
          .delete('splitwiseAuth');
      }
      return state;

    default:
      return state;
  }
};
