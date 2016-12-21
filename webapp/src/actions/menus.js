import { fromJS } from 'immutable';

import { REQUEST_MENU, RECEIVE_MENU } from './actionTypes';

const requestMenu = restaurantId => ({
    type: REQUEST_MENU,
    restaurantId: restaurantId
});

const receiveMenu = json => ({
    type: RECEIVE_MENU,
    menu: json
});

const fetchMenu = restaurantId => {
    return dispatch => {
        dispatch(requestMenu(restaurantId));
        return fetch(`/api/restaurants/${restaurantId}/menu`)
            .then( response => response.json() )
            .then( json => dispatch(receiveMenu(json)) );
    }
}

export default fetchMenu
