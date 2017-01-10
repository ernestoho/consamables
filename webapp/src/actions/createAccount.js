import 'whatwg-fetch';

import { push } from 'react-router-redux';

import {
    UPDATE_CONFIRM_PASSWORD_FIELD,
    SEND_NEW_ACCOUNT, NEW_ACCOUNT_SUCCESS, NEW_ACCOUNT_FAILURE,
    GOTO_LOGIN
} from './actionTypes';

import { TokenManager } from '../helpers';

export const updateConfirmPasswordField = text => ({
    type: UPDATE_CONFIRM_PASSWORD_FIELD,
    value: text
});

const sendNewAccount = () => ({ type: SEND_NEW_ACCOUNT });

const newAccountSuccess = (userId, username) => ({
    type: NEW_ACCOUNT_SUCCESS,
    id: userId,
    username: username
});

const newAccountFailure = error => ({
    type: NEW_ACCOUNT_FAILURE,
    error: error
});

export const submitNewAccount = data => {
    return dispatch => {
        if (!data.usernameValid) {
            dispatch(newAccountFailure('Invalid email address.'));
        } else if (!data.passwordValid) {
            dispatch(newAccountFailure('Invalid password.'));
        } else if (!data.passwordMatches) {
            dispatch(newAccountFailure('Passwords must match.'));
        } else {
            dispatch(sendNewAccount());
            fetch('api/user/new', {
                method: 'POST',
                body: JSON.stringify({username: data.username, password: data.password}),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
                .then(response => {
                    response.json().then(json => {
                        if (response.ok) {
                            TokenManager.storeAccessToken(json.accessTokenId);
                            dispatch(newAccountSuccess(json.userId, json.username));
                            dispatch(push('/'));
                        } else {
                            dispatch(newAccountFailure(json.message));
                        }
                    });
                })
                .catch( error => dispatch(newAccountFailure('Network Error.')) );
        }
    };
};

export const goToLogin = () => ({ type: GOTO_LOGIN });
