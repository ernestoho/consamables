export const getRestaurantName = (state, id) => state.getIn(['restaurants', id, 'name'], '');
