import {
    SHOW_MENU, HIDE_MENU,
    START_ORDER, JOIN_ORDER, ACTIVATE_ORDER, CONTINUE_ORDER, GO_BACK_TO_MENU,
    SHOW_SUGGESTION, HIDE_SUGGESTION,
    SUGGESTION_SUCCESS, NEW_GROUP_SUCCESS, NEW_ORDER_SUCCESS, ACTIVATED_GROUP_SUCCESS,
    LOGIN_SUCCESS, SET_USER_INFO, PROMPT_LOGIN,
    NEW_ACCOUNT_SUCCESS, GOTO_CREATE_ACCOUNT, GOTO_LOGIN,
    OPEN_PIZZA_BUILDER, CLOSE_PIZZA_BUILDER,
    SHOW_GROUP_DETAILS, HIDE_GROUP_DETAILS,
    SHOW_ORDER_DETAILS, HIDE_ORDER_DETAILS
} from '../../actions/actionTypes';

import {
    DISPLAY_DEFAULT,
    DISPLAY_LOGIN,
    DISPLAY_CREATE_ACCOUNT,
    DISPLAY_MENU_VIEWING,
    DISPLAY_MENU_ORDERING,
    DISPLAY_PIZZA_BUILDER,
    DISPLAY_ORDER_OPTIONS,
    DISPLAY_SUGGEST_OPTIONS,
    DISPLAY_GROUP_DETAILS,
    DISPLAY_ORDER_DETAILS
} from '../../constants';

const displayMode = (state = DISPLAY_DEFAULT, action) => {
    switch (action.type) {
        case PROMPT_LOGIN:
        case GOTO_LOGIN:
            return DISPLAY_LOGIN;

        case GOTO_CREATE_ACCOUNT:
            return DISPLAY_CREATE_ACCOUNT;

        case LOGIN_SUCCESS:
        case NEW_ACCOUNT_SUCCESS:
        case HIDE_MENU:
        case HIDE_SUGGESTION:
        case SUGGESTION_SUCCESS:
        case NEW_GROUP_SUCCESS:
        case NEW_ORDER_SUCCESS:
        case ACTIVATED_GROUP_SUCCESS:
        case HIDE_GROUP_DETAILS:
        case HIDE_ORDER_DETAILS:
            return DISPLAY_DEFAULT;

        case SHOW_MENU:
            return DISPLAY_MENU_VIEWING;

        case START_ORDER:
        case JOIN_ORDER:
        case ACTIVATE_ORDER:
        case GO_BACK_TO_MENU:
        case CLOSE_PIZZA_BUILDER:
            return DISPLAY_MENU_ORDERING;

        case OPEN_PIZZA_BUILDER:
            return DISPLAY_PIZZA_BUILDER;

        case CONTINUE_ORDER:
            return DISPLAY_ORDER_OPTIONS;

        case SHOW_SUGGESTION:
            return DISPLAY_SUGGEST_OPTIONS;

        case SHOW_GROUP_DETAILS:
            return DISPLAY_GROUP_DETAILS;

        case SHOW_ORDER_DETAILS:
            return DISPLAY_ORDER_DETAILS;

        default:
            return state;
    }
};

export default displayMode
