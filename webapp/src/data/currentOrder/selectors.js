import { itemSelectors } from '../items';

const { getItemPrice } = itemSelectors;

export const getCurrentOrderStage = state => state.getIn(['currentOrder', 'stage']);

export const getOrderItems = state => state.getIn(['currentOrder', 'items']);

export const getTotalCost = state => getOrderItems(state)
  .reduce(
    (total, item) => total + (getItemPrice(state, item.get('id')) * item.get('quantity')),
    0,
  );

export const isOrderStarted = state => !!getOrderItems(state).size;

export const getOrderStage = state => state.getIn(['currentOrder', 'stage']);
