import {
    SHOW_MENU,
    START_ORDER, JOIN_ORDER, ACTIVATE_ORDER
} from '../../actions/actionTypes';

const menuId = (state = -1, action) => {
    switch (action.type) {
        case SHOW_MENU:
            return action.id;

        case START_ORDER:
        case JOIN_ORDER:
        case ACTIVATE_ORDER:
            return action.restaurantId;

        default:
            return state;
    }
};

export default menuId
