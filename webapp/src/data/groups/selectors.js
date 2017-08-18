import { Map, List } from 'immutable';
import moment from 'moment';

import { restaurantSelectors } from '../restaurants';
import { userSelectors } from '../users';

const { getRestaurantName } = restaurantSelectors;
const { getUsername } = userSelectors;

export const getGroupRestaurantId = (state, groupId, groupType) => (groupType ?
  state.getIn(['groups', groupType, groupId, 'restaurantId'], 0) :
  (
    state.getIn(['groups', 'pending', groupId, 'restaurantId'], 0)
    ||
    state.getIn(['groups', 'active', groupId, 'restaurantId'], 0)
  )
);

export const getGroupRestaurantName = (state, groupId, groupType) => (
  getRestaurantName(state, getGroupRestaurantId(state, groupId, groupType))
);

export const getGroup = (state, groupId, groupType) => (
  state.getIn(['groups', groupType, groupId], Map())
);

export const getPendingGroups = state => state.getIn(['groups', 'pending'])
  .map(group => group.set(
    'restaurantName',
    getGroupRestaurantName(state, group.get('groupId'), 'pending')),
  ).toList();

export const anyPendingGroups = state => !!getPendingGroups(state).size;

export const getMyGroups = state => state.getIn(['groups', 'my']);

export const getMyOrders = state => getMyGroups(state)
  .reduce((orders, group) => orders.concat(group.get('orders')), List());

export const getMyOrder = (state, orderId) => getMyOrders(state)
  .find(order => order.get('orderId') === orderId, null, Map());

export const getMyOrderItems = (state, orderId) => getMyOrder(state, orderId)
  .get('orderItems', List());

export const getOrganizedGroups = state => state.getIn(['groups', 'organized']);

export const getOrganizedGroupSummary = state => getOrganizedGroups(state)
  .map(group => group
    .set('restaurantName', getRestaurantName(state, group.get('restaurantId'), 'organized'))
    .delete('orders'),
  ).toList();

export const anyOrganizedGroups = state => !!getOrganizedGroups(state).size;

export const getOrganizedOrders = (state, groupId) => getOrganizedGroups(state)
  .getIn([groupId, 'orders'], List())
  .map(order => order.set('username', getUsername(state, order.get('userId'))));

export const getActiveGroups = state => state
  .getIn(['groups', 'active'])
  .filter(group => !getOrganizedGroups(state).has(group.get('groupId')))
  .toList()
  .sortBy(group => group.get('timeStarted'));

export const getVisibleActiveGroups = (state, currentMoment) => getActiveGroups(state)
  .filter(group => moment(group.get('timeStarted'))
    .add(group.get('durationMinutes'), 'minutes')
    .isAfter(currentMoment),
  );

export const hasUserJoinedGroup = state => (
  !!getMyGroups(state).some((group, groupId) => !getOrganizedGroups(state).has(groupId))
);

export const hasUserOrganizedGroup = state => !!state.getIn(['groups', 'organized']).size;

export const getOverheadPercentage = (state, groupId) => state
  .getIn(['groups', 'active', groupId, 'overheadPercentage']);

export const getMyOrderRestaurantName = (state, orderId) => (
  getGroupRestaurantName(state, getMyOrder(state, orderId).get('groupId'), 'my')
);

export const getGroupAttribute = (state, groupId, groupType, attribute) => (
  getGroup(state, groupId, groupType).get(attribute)
);

export const hasGroupClosed = (state, groupId, groupType, currentMoment) => (
  moment(getGroupAttribute(state, groupId, groupType, 'timeStarted'))
    .add(getGroupAttribute(state, groupId, groupType, 'durationMinutes'), 'minutes')
    .isBefore(currentMoment)
);
