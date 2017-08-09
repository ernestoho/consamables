export const getRestaurant = (state, id) => state.getIn(['restaurants', id], Map());

export const getRestaurantName = (state, id) => getRestaurant(state, id).get('name', '');

export const getPizzaToppings = (state, id) => getRestaurant(state, id)
  .getIn(['data', 'pizza', 'toppings']);

export const getPizzaSauces = (state, id) => getRestaurant(state, id)
  .getIn(['data', 'pizza', 'sauces']);
