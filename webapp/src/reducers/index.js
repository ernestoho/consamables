import { combineReducers } from 'redux';

import activeOrders from './activeOrders';
import pendingOrders from './pendingOrders';
import restaurants from './restaurants';
import menus from './menus';
import items from './items';
import centerColumn from './centerColumn';
import currentUser from './currentUser';
import modal from './modal';

const rootReducer = combineReducers({
    activeOrders,
    pendingOrders,
    restaurants,
    menus,
    items,
    centerColumn,
    currentUser,
    modal
});

export default rootReducer
