import moment from 'moment';

export const getPendingGroups = state => state.getIn(['groups', 'pending']);

export const anyPendingGroups = state => !!getPendingGroups(state).size;

export const getMyGroups = state => state.getIn(['groups', 'my']);

export const getOrganizedGroups = state => state.getIn(['groups', 'organized']);

export const anyOrganizedGroups = state => !!getOrganizedGroups(state).size;

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

export const getGroupRestaurantId = (state, groupId) => (
  getPendingGroups(state).getIn([groupId, 'restaurantId'])
  ||
  getActiveGroups(state).getIn([groupId, 'restaurantId'])
);

export const getOverheadPercentage = (state, groupId) => getActiveGroups(state)
  .getIn([groupId, 'overheadPercentage']);
