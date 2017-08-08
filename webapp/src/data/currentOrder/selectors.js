import { calculateAdjustedOrderTotal } from 'common/utils';
import { MEAL_TAX } from 'common/constants';

import { itemSelectors } from '../items';
import { groupSelectors } from '../groups';

const { getItemPrice } = itemSelectors;
const { getOverheadPercentage } = groupSelectors;

export const getCurrentOrderStage = state => state.getIn(['currentOrder', 'stage']);

export const getOrderItems = state => state.getIn(['currentOrder', 'items']);

export const getOrderItemsToSubmit = state => getOrderItems(state).toList().map(
  item => item.set('itemId', item.get('id')).delete('id'),
);

export const getOrderTotal = state => getOrderItems(state)
  .reduce(
    (total, item) => total + (getItemPrice(state, item.get('id')) * item.get('quantity')),
    0,
  );

export const getAdjustedOrderTotal = (state, groupId) => calculateAdjustedOrderTotal(
  getOrderTotal(state),
  MEAL_TAX,
  getOverheadPercentage(state, groupId),
);

export const isOrderStarted = state => !!getOrderItems(state).size;

export const getOrderStage = state => state.getIn(['currentOrder', 'stage']);

export const isLoading = state => state.getIn(['currentOrder', 'loading'], false);

export const getOrderDuration = state => state.getIn(['currentOrder', 'options', 'duration']);

export const getOrderType = state => state.getIn(['currentOrder', 'options', 'type']);

export const getOrderOverhead = state => state.getIn(['currentOrder', 'options', 'overhead']);
