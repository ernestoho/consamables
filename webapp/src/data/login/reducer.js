import { Map } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import { types } from './actions';

const initialState = Map({
  username: '',
  password: '',
  confirmPassword: '',
  loading: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_USERNAME_FIELD:
      return state.set('username', action.value).delete('error');

    case types.UPDATE_PASSWORD_FIELD:
      return state.set('password', action.value).delete('error');

    case types.UPDATE_CONFIRM_PASSWORD_FIELD:
      return state.set('confirmPassword', action.value).delete('error');

    case types.SEND_LOGIN:
    case types.SEND_NEW_ACCOUNT:
      return state.set('loading', true).delete('error');

    case types.LOGIN_FAILURE:
    case types.NEW_ACCOUNT_FAILURE:
      return state.set('loading', false).set('error', action.error);

    case types.LOGIN_SUCCESS:
    case types.NEW_ACCOUNT_SUCCESS:
    case types.SET_USER_INFO:
      return state
        .set('loading', false)
        .set('username', '')
        .set('password', '')
        .delete('confirmPassword')
        .delete('error');

    case LOCATION_CHANGE:
      return state.delete('error');

    default:
      return state;
  }
};
