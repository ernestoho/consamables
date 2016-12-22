import { combineReducers } from 'redux';

import activeOrders from './activeOrders';
import pendingOrders from './pendingOrders';
import restaurants from './restaurants';
import menus from './menus';
import centerColumn from './centerColumn';
import modal from './modal';

const rootReducer = combineReducers({
    activeOrders,
    pendingOrders,
    restaurants,
    menus,
    centerColumn,
    modal
});

export default rootReducer
