export const getRestaurantName = (state, id) => state.restaurants.has(id.toString()) ?
                                                state.restaurants.get(id.toString()).get('name')
                                                : '';
