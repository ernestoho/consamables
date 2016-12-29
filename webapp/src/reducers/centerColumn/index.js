import { combineReducers } from 'redux';

import displayMode from './displayMode';
import menuId from './menuId';
import currentOrder from './currentOrder';
import suggestOrder from './suggestOrder';

const centerColumn = combineReducers({
    displayMode,
    menuId,
    currentOrder,
    suggestOrder
});

export default centerColumn
