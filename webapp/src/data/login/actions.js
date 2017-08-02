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
  'SEND_NEW_ACCOUNT',
  'NEW_ACCOUNT_SUCCESS',
  'NEW_ACCOUNT_FAILURE',
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

  updateConfirmPasswordField: text => ({
    type: types.UPDATE_CONFIRM_PASSWORD_FIELD,
    value: text,
  }),

  sendNewAccount: () => ({ type: types.SEND_NEW_ACCOUNT }),

  newAccountSuccess: (userId, username) => ({
    type: types.NEW_ACCOUNT_SUCCESS,
    id: userId,
    username,
  }),

  newAccountFailure: error => ({
    type: types.NEW_ACCOUNT_FAILURE,
    error,
  }),

  submitNewAccount: data => dispatch => {
    const { usernameValid, passwordValid, passwordMatches, username, password } = data;

    if (!usernameValid) {
      dispatch(actions.newAccountFailure('Invalid email address.'));
    } else if (!passwordValid) {
      dispatch(actions.newAccountFailure('Invalid password.'));
    } else if (!passwordMatches) {
      dispatch(actions.newAccountFailure('Passwords must match.'));
    } else {
      dispatch(actions.sendNewAccount());
      fetch('/api/user/new', buildPostRequest({ username, password }, false))
        .then(response => {
          response.json().then(json => {
            if (response.ok) {
              TokenManager.storeAccessToken(json.accessTokenId);
              if (!json.splitwiseAuthenticated) {
                dispatch(actions.redirectToSplitwise());
              } else {
                dispatch(actions.newAccountSuccess(json.userId, json.username));
                dispatch(push('/'));
              }
            } else {
              dispatch(actions.newAccountFailure(json.message));
            }
          });
        })
        .catch(() => dispatch(actions.newAccountFailure('Network Error.')));
    }
  },

  goToLogin: () => ({ type: types.GOTO_LOGIN }),
};
