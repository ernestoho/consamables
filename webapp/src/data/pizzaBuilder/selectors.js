export const getItemId = state => state.getIn(['pizzaBuilder', 'itemId']);

export const getPizzaSize = state => state.getIn(['pizzaBuilder', 'size'], '');

export const getCurrentToppings = state => state.getIn(['pizzaBuilder', 'toppings']);

export const getDefaultSauce = state => state.getIn(['pizzaBuilder', 'defaultSauce']);

export const getCurrentSauce = state => state.getIn(['pizzaBuilder', 'sauce']);

export const getCurrentCheese = state => state.getIn(['pizzaBuilder', 'cheese']);

export const isToppingSelected = (state, topping) => state
  .hasIn(['pizzaBuilder', 'toppings', topping]);

export const getToppingSide = (state, topping) => state
  .getIn(['pizzaBuilder', 'toppings', topping]);

export const getToppingsOnSide = (state, side) => getCurrentToppings(state)
  .filter(toppingSide => toppingSide === side)
  .keySeq();
