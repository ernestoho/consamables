export const getItemName = (state, id) => state.getIn(['items', id, 'name'], '');

export const getItemPrice = (state, id) => state.getIn(['items', id, 'price'], 0);

export const getMaxPizzaToppings = (state, id) => state
  .getIn(['items', id, 'data', 'pizza', 'maxToppings']);
