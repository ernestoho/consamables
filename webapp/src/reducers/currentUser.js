import { Map } from 'immutable';

import {
    LOGIN_SUCCESS, NEW_ACCOUNT_SUCCESS, SET_USER_INFO,
    PROMPT_LOGIN
} from '../actions/actionTypes';

const currentUser = (state = Map({ loggedIn: false }), action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
        case NEW_ACCOUNT_SUCCESS:
        case SET_USER_INFO:
            return state.set('loggedIn', true)
                        .set('userId', action.id)
                        .set('username', action.username);

        case PROMPT_LOGIN:
            return state.set('loggedIn', false)
                        .delete('userId')
                        .delete('username');

        default:
            return state;
    }
};

export default currentUser
