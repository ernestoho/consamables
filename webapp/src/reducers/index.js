import { combineReducers } from 'redux';

import restaurants from './restaurants';
import activeOrders from './activeOrders';
import pendingOrders from './pendingOrders';

const rootReducer = combineReducers({
    restaurants,
    activeOrders,
    pendingOrders
});

export default rootReducer
