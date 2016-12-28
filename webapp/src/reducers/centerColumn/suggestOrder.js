import { Map } from 'immutable';

import { SHOW_SUGGESTION } from '../../actions/actionTypes';

const suggestOrder = (state = Map(), action) => {
    switch (action.type) {
        case SHOW_SUGGESTION:
            return state.set('restaurantId', action.id);

        default:
            return state;
    }
};

export default suggestOrder
