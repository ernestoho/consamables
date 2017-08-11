import { Map } from 'immutable';

import { pizzaOverCapacity } from 'common/utils';

import { types } from './actions';
import { currentOrderActionTypes } from '../currentOrder';

export default (state = Map(), action) => {
  switch (action.type) {
    case types.OPEN_PIZZA_BUILDER:
      return state
        .set('itemId', action.id)
        .set('size', 'half')
        .set('toppings', Map())
        .set('cheese', 'Normal Cheese');

    case types.SET_PIZZA_SIZE:
      if (action.value === 'half') {
        return state
          .set('sauce', state.get('defaultSauce'))
          .set('toppings', Map())
          .set('size', action.value);
      }
      return state.set('size', action.value);

    case types.TOGGLE_TOPPING: {
      let newState;

      if (state.hasIn(['toppings', action.name])) {
        return state.deleteIn(['toppings', action.name]);
      }

      newState = state.setIn(['toppings', action.name], 'whole');

      if (pizzaOverCapacity(newState)) {
        newState = state.setIn(['toppings', action.name], 'left');

        if (pizzaOverCapacity(newState)) {
          return state;
        }
      }
      return newState;
    }

    case types.CHANGE_TOPPING_SIDE: {
      const newState = state.setIn(['toppings', action.name], action.side);
      if (pizzaOverCapacity(newState)) {
        return state;
      }
      return newState;
    }

    case types.SET_INITIAL_SAUCE:
      return state.set('defaultSauce', action.value).set('sauce', action.value);

    case types.SET_MAX_TOPPINGS:
      return state.set('maxToppings', action.value);

    case types.CHANGE_SAUCE: {
      const newState = state.set('sauce', action.value);
      if (pizzaOverCapacity(newState)) {
        return state;
      }
      return newState;
    }

    case types.CHANGE_CHEESE: {
      const newState = state.set('cheese', action.value);
      if (pizzaOverCapacity(newState)) {
        return state;
      }
      return newState;
    }

    case currentOrderActionTypes.ADD_ITEM_TO_ORDER:
      return state.clear().set('toppings', Map());

    default:
      return state;
  }
};
