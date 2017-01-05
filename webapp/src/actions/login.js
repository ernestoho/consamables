import {
    PROMPT_LOGIN, SET_USER_INFO,
    UPDATE_USERNAME_FIELD, UPDATE_PASSWORD_FIELD,
    SEND_LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE,
    GOTO_CREATE_ACCOUNT
} from './actionTypes';

import { TokenManager, buildPostInit, buildGetInit } from '../helpers';
import { fetchOrganizedOrders } from './organizer';

export const promptLogin = () => ({ type: PROMPT_LOGIN });

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
                        dispatch(loginSuccess(json.userId, json.username));
                        dispatch(fetchOrganizedOrders());
                    } else {
                        dispatch(loginFailure(json.message));
                    }
                });
            })
            .catch( error => dispatch(loginFailure('Network Error.')) );
    };
};

export const verifyUser = () => {
    return dispatch => {
        if (!TokenManager.retrieveAccessToken()) {
            dispatch(promptLogin());
        } else {
            fetch('/api/user/get-info', buildGetInit())
                .then(response => {
                    if (response.ok) {
                        response.json().then(json => {
                            dispatch(setUserInfo(json.userId, json.email));
                            dispatch(fetchOrganizedOrders());
                        });
                    } else {
                        dispatch(promptLogin());
                    }
                });
        }
    }
}

export const logOut = () => {
    return dispatch => {
        TokenManager.clearAccessToken();
        dispatch(promptLogin());
    }
}

export const goToCreateAccount = () => ({ type: GOTO_CREATE_ACCOUNT });
