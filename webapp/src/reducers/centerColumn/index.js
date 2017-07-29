import { combineReducers } from 'redux';

import currentOrder from './currentOrder';
import suggestOrder from './suggestOrder';
import login from './login';
import pizzaBuilder from './pizzaBuilder';
import organizer from './organizer';
import myOrderDetails from './myOrderDetails';
import vote from './vote';

const centerColumn = combineReducers({
  currentOrder,
  suggestOrder,
  login,
  pizzaBuilder,
  organizer,
  myOrderDetails,
  vote
});

export default centerColumn;
