import { Map } from 'immutable';

import { SHOW_ORDER_DETAILS } from '../../actions/actionTypes';

const myOrderDetails = (state = Map(), action) => {
    switch (action.type) {
        case SHOW_ORDER_DETAILS:
            return state.set('orderId', action.id);

        default:
            return state;
    }
}

export default myOrderDetails
