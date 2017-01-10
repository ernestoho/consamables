import 'whatwg-fetch';

import { fromJS } from 'immutable';

import { REQUEST_MENU, RECEIVE_MENU, SHOW_MENU, HIDE_MENU } from './actionTypes';

const requestMenu = restaurantId => ({
    type: REQUEST_MENU,
    id: restaurantId
});

const receiveMenu = json => ({
    type: RECEIVE_MENU,
    menu: fromJS(json)
});

export const fetchMenu = restaurantId => {
    return dispatch => {
        dispatch(requestMenu(restaurantId));
        return fetch(`/api/restaurants/${restaurantId}/menu`)
            .then( response => response.json() )
            .then( json => dispatch(receiveMenu(json)) );
    };
};
