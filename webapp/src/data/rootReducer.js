import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import currentOrder from './currentOrder';
import groups from './groups';
import items from './items';
import login from './login';
import menus from './menus';
import pizzaBuilder from './pizzaBuilder';
import restaurants from './restaurants';
import suggestedOrder from './suggestedOrder';
import users from './users';
import vote from './vote';

export default combineReducers({
  currentOrder,
  groups,
  items,
  login,
  menus,
  pizzaBuilder,
  restaurants,
  suggestedOrder,
  users,
  vote,
  routing: routerReducer,
});
