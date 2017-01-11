import 'whatwg-fetch';

import { push } from 'react-router-redux';

import {
    PROMPT_LOGIN, SET_USER_INFO,
    UPDATE_USERNAME_FIELD, UPDATE_PASSWORD_FIELD,
    SEND_LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE,
    GOTO_CREATE_ACCOUNT
} from './actionTypes';

import { TokenManager, buildPostInit, buildGetInit } from '../helpers';
import { fetchOrganizedOrders } from './organizer';
import { fetchMyOrders } from './order';

export const setUserInfo = (userId, username) => ({
    type: SET_USER_INFO,
    id: userId,
    username: username
});

export const updateUsernameField = text => ({
    type: UPDATE_USERNAME_FIELD,
    value: text
});

export const updatePasswordField = text => ({
    type: UPDATE_PASSWORD_FIELD,
    value: text
});

const sendLogin = () => ({ type: SEND_LOGIN });

const loginSuccess = (userId, username) => ({
    type: LOGIN_SUCCESS,
    id: userId,
    username: username
});

const loginFailure = error => ({
    type: LOGIN_FAILURE,
    error: error
});

export const submitLogin = data => {
    return dispatch => {
        dispatch(sendLogin());
        fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(response => {
                response.json().then(json => {
                    if (response.ok) {
                        TokenManager.storeAccessToken(json.accessTokenId);
                        if (!json.splitwiseAuthenticated) {
                            dispatch(redirectToSplitwise());
                        } else {
                            dispatch(loginSuccess(json.userId, json.username));
                            dispatch(push('/'));
                            dispatch(fetchOrganizedOrders());
                            dispatch(fetchMyOrders());
                        }
                    } else {
                        dispatch(loginFailure(json.message));
                    }
                });
            })
            .catch( error => dispatch(loginFailure('Network Error.')) );
    };
};

const loadUserInfo = (userId, email) => {
    return dispatch => {
        dispatch(setUserInfo(userId, email));
        dispatch(fetchOrganizedOrders());
        dispatch(fetchMyOrders());
    };
};

export const verifyUser = () => {
    return dispatch => {
        if (!TokenManager.retrieveAccessToken()) {
            dispatch(push('/login'));
        } else {
            fetch('/api/user/get-info', buildGetInit())
                .then(response => {
                    if (response.ok) {
                        response.json().then(json => {
                            dispatch(loadUserInfo(json.userId, json.email));
                        });
                    } else {
                        dispatch(push('/login'));
                    }
                });
        }
    };
};

export const verifyAndAuthenticateWithSplitwise = (token, verifier) => {
    return dispatch => {
        if (!TokenManager.retrieveAccessToken()) {
            dispatch(push('/login'));
        } else {
            fetch('/api/user/get-info', buildGetInit())
                .then(response => {
                    if (response.ok) {
                        response.json().then(json => {
                            dispatch(loadUserInfo(json.userId, json.email));
                            dispatch(authenticateWithSplitwise({
                                requestToken: token,
                                verifier: verifier,
                                userId: json.userId
                            }));
                        });
                    } else {
                        dispatch(push('/login'));
                    }
                });
        }
    };
};

export const logOut = () => {
    return dispatch => {
        TokenManager.clearAccessToken();
        dispatch(push('/login'));
    }
}

const redirectToSplitwise = () => {
    return dispatch => {
        fetch('/api/payment/authorize-url', buildGetInit())
            .then( response => response.text() )
            .then(text => {
                window.location.assign(text);
            });
    };
};

const authenticateWithSplitwise = params => {
    return dispatch => {
        fetch('/api/payment/authenticate-user', buildPostInit(params))
            .then(response => {
                if (response.ok) {
                    dispatch(push('/'));
                } else {
                    dispatch(push('/login'));
                }
            });
    };
};
