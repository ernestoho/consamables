import { combineReducers } from 'redux';

import activeOrders from './activeOrders';
import pendingOrders from './pendingOrders';
import restaurants from './restaurants';
import menus from './menus';
import modal from './modal';

const rootReducer = combineReducers({
    activeOrders,
    pendingOrders,
    restaurants,
    menus,
    modal
});

export default rootReducer
