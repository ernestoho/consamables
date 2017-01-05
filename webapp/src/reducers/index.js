import { combineReducers } from 'redux';

import activeOrders from './activeOrders';
import pendingOrders from './pendingOrders';
import organizedOrders from './organizedOrders';
import restaurants from './restaurants';
import menus from './menus';
import items from './items';
import centerColumn from './centerColumn';
import currentUser from './currentUser';
import users from './users';

const rootReducer = combineReducers({
    activeOrders,
    pendingOrders,
    organizedOrders,
    restaurants,
    menus,
    items,
    centerColumn,
    currentUser,
    users
});

export default rootReducer
