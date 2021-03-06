import 'whatwg-fetch';

import { push } from 'react-router-redux';

import { RECEIVE_USERNAME } from './actionTypes';
import { buildGetInit } from '../helpers';

const receiveUsername = (userId, username) => ({
    type: RECEIVE_USERNAME,
    id: userId,
    value: username
});

export const fetchUsername = userId => {
    return dispatch => {
        fetch(`/api/user/${userId}/name`, buildGetInit())
            .then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        dispatch(receiveUsername(json.userId, json.email));
                    });
                } else if (response.status == 401) {
                    dispatch(push('/login'));
                }
            });
    };
};
