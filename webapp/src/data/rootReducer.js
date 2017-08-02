import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';

import currentOrder from './currentOrder';
import currentUser from './currentUser';
import groups from './groups';
import items from './items';
import login from './login';
import menus from './menus';
import pizzaBuilder from './pizzaBuilder';
import restaurants from './restaurants';
import suggestedOrder from './suggestedOrder';
import users from './users';
import vote from './vote';
import routing from './routing';

export default combineReducers({
  currentOrder,
  currentUser,
  groups,
  items,
  login,
  menus,
  pizzaBuilder,
  restaurants,
  suggestedOrder,
  users,
  vote,
  routing,
});
