import { SHOW_MENU, START_ORDER, JOIN_ORDER } from '../../actions/actionTypes';

const menuId = (state = -1, action) => {
    switch (action.type) {
        case SHOW_MENU:
        case START_ORDER:
            return action.id;

        case JOIN_ORDER:
            return action.restaurantId;

        default:
            return state;
    }
};

export default menuId
