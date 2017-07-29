import { List } from 'immutable';

export const getRestaurantName = (state, id) => state.restaurants.has(id) ?
                        state.restaurants.get(id).get('name')
                        : '';

export const getGroupRestaurantId = (state, id) => {
  return state.pendingOrders.getIn([id, 'restaurantId']) || state.activeOrders.getIn([id, 'restaurantId']);
};

export const getGroupRestaurant = (state, id) => {
  const restaurantId = getGroupRestaurantId(state, id);
  return state.restaurants.getIn([restaurantId, 'name']);
};

export const getMenu = (state, id) => state.menus.has(id) ?
                    state.menus.get(id)
                    : List();

export const getItemName = (state, id) => state.items.has(id) ?
                      state.items.get(id).get('name')
                      : '';
export const getItemPrice = (state, id) => state.items.has(id) ?
                       state.items.get(id).get('price')
                       : 0;

export const getOverheadPercentage = (state, id) => state.activeOrders.getIn([id, 'overheadPercentage']);
