import { Map } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import { LOGIN_SUCCESS, NEW_ACCOUNT_SUCCESS, SET_USER_INFO } from '../actions/actionTypes';

const currentUser = (state = Map({ loggedIn: false }), action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case NEW_ACCOUNT_SUCCESS:
    case SET_USER_INFO:
      return state.set('loggedIn', true)
            .set('userId', action.id)
            .set('username', action.username)
            .set('splitwiseAuth', action.splitwiseAuth);

    case LOCATION_CHANGE:
      if (action.payload.pathname == '/login') {
        return state.set('loggedIn', false)
              .delete('userId')
              .delete('username')
              .delete('splitwiseAuth');
      }
      return state;

    default:
      return state;
  }
};

export default currentUser;
