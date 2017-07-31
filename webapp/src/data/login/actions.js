import { push } from 'react-router-redux';

import { createActionTypes, TokenManager, buildGetRequest, buildPostRequest } from 'common/utils';

const prefix = 'LOGIN';

export const types = createActionTypes([
  'PROMPT_LOGIN',
  'SET_USER_INFO',
  'UPDATE_USERNAME_FIELD',
  'UPDATE_PASSWORD_FIELD',
  'SEND_LOGIN',
  'LOGIN_SUCCESS',
  'LOGIN_FAILURE',
  'GOTO_CREATE_ACCOUNT',
], prefix);

export const actions = {
  setUserInfo: (id, username, splitwiseAuth) => ({
    type: types.SET_USER_INFO,
    id,
    username,
    splitwiseAuth,
  }),

  updateUsernameField: text => ({
    type: types.UPDATE_USERNAME_FIELD,
    value: text,
  }),

  updatePasswordField: text => ({
    type: types.UPDATE_PASSWORD_FIELD,
    value: text,
  }),

  sendLogin: () => ({ type: types.SEND_LOGIN }),

  // This might be deprecated
  loginSuccess: (id, username, splitwiseAuth) => ({
    type: types.LOGIN_SUCCESS,
    id,
    username,
    splitwiseAuth,
  }),

  loginFailure: error => ({
    type: types.LOGIN_FAILURE,
    error,
  }),

  submitLogin: data => dispatch => {
    dispatch(actions.sendLogin());
    fetch('/api/user/login', buildPostRequest(data, false))
      .then(response => {
        response.json().then(
          ({ accessTokenId, splitwiseAuthenticated, userId, username, message }) => {
            if (response.ok) {
              TokenManager.storeAccessToken(accessTokenId);
              if (!splitwiseAuthenticated) {
                dispatch(actions.redirectToSplitwise());
              } else {
                dispatch(actions.loadUserInfo(
                  userId,
                  username,
                  splitwiseAuthenticated,
                ));
                dispatch(push('/'));
              }
            } else {
              dispatch(actions.loginFailure(message));
            }
          },
        );
      })
      .catch(() => dispatch(actions.loginFailure('Network Error.'))); // TODO: maybe surface this error
  },

  loadUserInfo: (userId, email, auth) => dispatch => {
    dispatch(actions.setUserInfo(userId, email, auth));
    dispatch(actions.fetchOrganizedOrders());
    dispatch(actions.fetchMyOrders());
    dispatch(actions.fetchPendingOrders(true));
  },

  verifyUser: () => dispatch => {
    if (!TokenManager.retrieveAccessToken()) {
      dispatch(push('/login'));
    } else {
      fetch('/api/user/get-info', buildGetRequest())
        .then(response => {
          if (response.ok) {
            response.json().then(json => {
              dispatch(actions.loadUserInfo(
                json.userId,
                json.email,
                json.splitwiseAuthenticated,
              ));
            });
          } else {
            dispatch(push('/login'));
          }
        });
    }
  },

  verifyAndAuthenticateWithSplitwise: (requestToken, verifier) => dispatch => {
    if (!TokenManager.retrieveAccessToken()) {
      dispatch(push('/login'));
    } else {
      fetch('/api/user/get-info', buildGetRequest())
        .then(response => {
          if (response.ok) {
            response.json().then(({ userId, email, splitwiseAuthenticated }) => {
              dispatch(actions.loadUserInfo(
                userId,
                email,
                splitwiseAuthenticated,
              ));
              dispatch(actions.authenticateWithSplitwise({
                requestToken,
                verifier,
                userId,
              }));
            });
          } else {
            dispatch(push('/login'));
          }
        });
    }
  },

  logOut: () => dispatch => {
    TokenManager.clearAccessToken();
    dispatch(push('/login'));
  },

  redirectToSplitwise: () => () => {
    fetch('/api/payment/authorize-url', buildGetRequest())
      .then(response => response.text())
      .then(url => { window.location.assign(url); });
  },

  authenticateWithSplitwise: params => dispatch => {
    fetch('/api/payment/authenticate-user', buildPostRequest(params))
      .then(response => {
        if (response.ok) {
          dispatch(push('/'));
        } else {
          dispatch(push('/login'));
        }
      });
  },
};
