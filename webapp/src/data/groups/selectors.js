export const getActiveGroups = state => state.getIn(['groups', 'active']);

export const getPendingGroups = state => state.getIn(['groups', 'pending']);

export const getMyGroups = state => state.getIn(['groups', 'my']);

export const getOrganizedGroups = state => state.getIn(['groups', 'organized']);

export const hasUserJoinedGroup = state => (
  !!getMyGroups(state).some((group, groupId) => !getOrganizedGroups(state).has(groupId))
);

export const hasUserOrganizedGroup = state => !!state.getIn(['groups', 'organized']).size;

export const getGroupRestaurantId = (state, groupId) => (
  getPendingGroups(state).getIn([groupId, 'restaurantId'])
  ||
  getActiveGroups(state).getIn([groupId, 'restaurantId'])
);

export const getOverheadPercentage = (state, groupId) => getActiveGroups(state)
  .getIn([groupId, 'overheadPercentage']);
