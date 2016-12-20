import { combineReducers } from 'redux';

import activeOrders from './activeOrders';
import pendingOrders from './pendingOrders';
import restaurants from './restaurants';
import modal from './modal';

const rootReducer = combineReducers({
    activeOrders,
    pendingOrders,
    restaurants,
    modal
});

export default rootReducer
