import { combineReducers } from 'redux';

import displayMode from './displayMode';
import menuId from './menuId';
import currentOrder from './currentOrder';
import suggestOrder from './suggestOrder';
import login from './login';

const centerColumn = combineReducers({
    displayMode,
    menuId,
    currentOrder,
    suggestOrder,
    login
});

export default centerColumn
