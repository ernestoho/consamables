import { Map, List } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  START_ORDER, JOIN_ORDER, ACTIVATE_ORDER,
  ADD_ITEM_TO_ORDER, REMOVE_ITEM_FROM_ORDER,
  INCREMENT_ITEM, DECREMENT_ITEM, SET_QUANTITY,
  CONTINUE_ORDER, GO_BACK_TO_MENU,
  OPEN_PIZZA_BUILDER, CLOSE_PIZZA_BUILDER,
  SET_ORDER_TYPE, SET_ORDER_DURATION, SET_OVERHEAD,
  SEND_NEW_GROUP, NEW_GROUP_FAILURE, NEW_GROUP_SUCCESS,
  SEND_NEW_ORDER, NEW_ORDER_FAILURE, NEW_ORDER_SUCCESS,
  SEND_ACTIVATED_GROUP, ACTIVATED_GROUP_FAILURE, ACTIVATED_GROUP_SUCCESS
} from '../../actions/actionTypes';

const startOrder = (state, action, orderType) => {
  let newState;
  // Clear items if switching restaurants
  if (state.get('items').size > 0 && state.get('restaurantId') != action.restaurantId) {
    newState = state.set('items', List())
            .set('loading', false);
  } else {
    newState = state;
  }
  return newState.set('mode', orderType)
           .set('restaurantId', action.restaurantId);
};

const currentOrder = (state = Map({ items: List(), stage: 'choose' }), action) => {
  switch (action.type) {
    case START_ORDER:
      return startOrder(state, action, 'start').delete('groupId');

    case JOIN_ORDER:
      return startOrder(state, action, 'join').set('groupId', action.groupId);

    case ACTIVATE_ORDER:
      return startOrder(state, action, 'activate').set('groupId', action.groupId);

    case ADD_ITEM_TO_ORDER:
      let items = state.get('items');
      let [index, match] = items.findEntry(
        item => {
          let dataMatch;
          if (item.get('data')) {
            dataMatch = item.get('data').equals(Map(action.data));
          } else {
            dataMatch = !action.data;
          }
          return item.get('id') == action.id && dataMatch;
        },
        null,
        [null, null]
      );
      if (!match) {
        return state.set('items', items.push(
          Map({
            id: action.id,
            quantity: 1,
            data: action.data
          })
        ));
      } else {
        return state.updateIn(['items', index, 'quantity'], q => q + 1);
      }

    case REMOVE_ITEM_FROM_ORDER:
      let newState = state.deleteIn(['items', action.index]);
      if (newState.get('items').size == 0) {
        return newState.set('stage', 'choose');
      }
      return newState;

    case INCREMENT_ITEM:
      return state.updateIn(['items', action.index, 'quantity'], q => q + 1);

    case DECREMENT_ITEM:
      return state.updateIn(['items', action.index, 'quantity'], q => q - 1);

    case SET_QUANTITY:
      return state.setIn(['items', action.index, 'quantity'], action.quantity);

    case CONTINUE_ORDER:
      return state.set('stage', 'confirm')
            .set('options', Map({
              'type': 'delivery',
              'duration': 30,
              'overhead': 0
            }));

    case OPEN_PIZZA_BUILDER:
      return state.set('stage', 'pizza');

    case CLOSE_PIZZA_BUILDER:
      return state.set('stage', 'choose');

    case GO_BACK_TO_MENU:
      return state.set('stage', 'choose');

    case SET_ORDER_TYPE:
      return state.setIn(['options', 'type'], action.value);

    case SET_ORDER_DURATION:
      return state.setIn(['options', 'duration'], action.value);

    case SET_OVERHEAD:
      return state.setIn(['options', 'overhead'], action.value);

    case SEND_NEW_GROUP:
    case SEND_NEW_ORDER:
    case SEND_ACTIVATED_GROUP:
      return state.set('loading', true);

    case NEW_GROUP_FAILURE:
    case NEW_ORDER_FAILURE:
    case ACTIVATED_GROUP_FAILURE:
      return state.set('loading', false);

    case NEW_GROUP_SUCCESS:
    case NEW_ORDER_SUCCESS:
    case ACTIVATED_GROUP_SUCCESS:
      return state.set('items', List())
            .set('loading', false)
            .set('stage', 'choose');

    case LOCATION_CHANGE:
      if (action.payload.pathname == '/') {
        return state.set('stage', 'choose');
      }
      return state;

    default:
      return state;
  }
};

export default currentOrder;
