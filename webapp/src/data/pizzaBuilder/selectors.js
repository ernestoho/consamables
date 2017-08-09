export const getItemId = state => state.getIn(['pizzaBuilder', 'itemId']);

export const getPizzaSize = state => state.getIn(['pizzaBuilder', 'size'], '');

export const getCurrentPizzaToppings = state => state.getIn(['pizzaBuilder', 'toppings']);
