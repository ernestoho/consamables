import { createActionTypes } from 'common/utils';

const prefix = 'PIZZA_BUILDER';

export const types = createActionTypes([
  'OPEN_PIZZA_BUILDER',
  'CLOSE_PIZZA_BUILDER',
  'SET_PIZZA_SIZE',
  'TOGGLE_TOPPING',
  'CHANGE_TOPPING_SIDE',
  'SET_INITIAL_SAUCE',
  'SET_MAX_TOPPINGS',
  'CHANGE_SAUCE',
  'CHANGE_CHEESE',
], prefix);

export const actions = {
  openPizzaBuilder: itemId => ({
    type: types.OPEN_PIZZA_BUILDER,
    id: itemId,
  }),

  closePizzaBuilder: () => ({ type: types.CLOSE_PIZZA_BUILDER }),

  setPizzaSize: size => ({
    type: types.SET_PIZZA_SIZE,
    value: size,
  }),

  toggleTopping: name => ({
    type: types.TOGGLE_TOPPING,
    name,
  }),

  changeToppingSide: (name, side) => ({
    type: types.CHANGE_TOPPING_SIDE,
    name,
    side,
  }),

  setInitialSauce: sauce => ({
    type: types.SET_INITIAL_SAUCE,
    value: sauce,
  }),

  setMaxToppings: value => ({
    type: types.SET_MAX_TOPPINGS,
    value,
  }),

  changeSauce: sauce => ({
    type: types.CHANGE_SAUCE,
    value: sauce,
  }),

  changeCheese: cheese => ({
    type: types.CHANGE_CHEESE,
    value: cheese,
  }),
};
