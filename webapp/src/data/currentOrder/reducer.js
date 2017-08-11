import { Map, List } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import { types } from './actions';
import { types as pizzaBuilderActionTypes } from '../pizzaBuilder/actions';

const startOrder = (state, action, orderType) => {
  let newState;
  // Clear items if switching restaurants
  if (state.get('items').size > 0 && state.get('restaurantId') !== action.restaurantId) {
    newState = state.set('items', List()).set('loading', false);
  } else {
    newState = state;
  }
  return newState.set('mode', orderType).set('restaurantId', action.restaurantId);
};

export default (state = Map({ items: List(), stage: 'choose' }), action) => {
  switch (action.type) {
    case types.START_ORDER:
      return startOrder(state, action, 'start').delete('groupId');

    case types.JOIN_ORDER:
      return startOrder(state, action, 'join').set('groupId', action.groupId);

    case types.ACTIVATE_ORDER:
      return startOrder(state, action, 'activate').set('groupId', action.groupId);

    case types.ADD_ITEM_TO_ORDER: {
      const items = state.get('items');
      const [index, match] = items.findEntry(
        item => {
          let dataMatch;
          if (item.get('data')) {
            dataMatch = item.get('data').equals(Map(action.data));
          } else {
            dataMatch = !action.data;
          }
          return item.get('id') === action.id && dataMatch;
        },
        null,
        [null, null],
      );
      if (!match) {
        return state.set('items', items.push(Map({
          id: action.id,
          quantity: 1,
          data: action.data,
        })));
      }
      return state.updateIn(['items', index, 'quantity'], q => q + 1);
    }

    case types.REMOVE_ITEM_FROM_ORDER: {
      const newState = state.deleteIn(['items', action.index]);
      if (newState.get('items').size === 0) {
        return newState.set('stage', 'choose');
      }
      return newState;
    }

    case types.INCREMENT_ITEM:
      return state.updateIn(['items', action.index, 'quantity'], q => q + 1);

    case types.DECREMENT_ITEM:
      return state.updateIn(['items', action.index, 'quantity'], q => q - 1);

    case types.SET_QUANTITY:
      return state.setIn(['items', action.index, 'quantity'], action.quantity);

    case types.CONTINUE_ORDER:
      return state
        .set('stage', 'confirm')
        .set('options', Map({
          type: 'delivery',
          duration: 30,
          overhead: 0,
        }));

    case pizzaBuilderActionTypes.OPEN_PIZZA_BUILDER:
      return state.set('stage', 'pizza');

    case pizzaBuilderActionTypes.CLOSE_PIZZA_BUILDER:
      return state.set('stage', 'choose');

    case types.GO_BACK_TO_MENU:
      return state.set('stage', 'choose');

    case types.SET_ORDER_TYPE:
      return state.setIn(['options', 'type'], action.value);

    case types.SET_ORDER_DURATION:
      return state.setIn(['options', 'duration'], action.value);

    case types.SET_OVERHEAD:
      return state.setIn(['options', 'overhead'], action.value);

    case types.SEND_NEW_GROUP:
    case types.SEND_NEW_ORDER:
    case types.SEND_ACTIVATED_GROUP:
      return state.set('loading', true);

    case types.NEW_GROUP_FAILURE:
    case types.NEW_ORDER_FAILURE:
    case types.ACTIVATED_GROUP_FAILURE:
      return state.set('loading', false);

    case types.NEW_GROUP_SUCCESS:
    case types.NEW_ORDER_SUCCESS:
    case types.ACTIVATED_GROUP_SUCCESS:
      return state
        .set('items', List())
        .set('loading', false)
        .set('stage', 'choose');

    case LOCATION_CHANGE:
      if (action.payload.pathname === '/') {
        return state.set('stage', 'choose');
      }
      return state;

    default:
      return state;
  }
};
