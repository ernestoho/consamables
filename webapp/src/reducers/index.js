import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import activeOrders from './activeOrders';
import pendingOrders from './pendingOrders';
import organizedOrders from './organizedOrders';
import myOrders from './myOrders';
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
    myOrders,
    restaurants,
    menus,
    items,
    centerColumn,
    currentUser,
    users,
    routing: routerReducer
});

export default rootReducer
