export const getDrivingPreference = state => state.getIn(['suggestedOrder', 'driving']);

export const getWaitTimePreference = state => state.getIn(['suggestedOrder', 'waitTime']);

export const getOrderTypePreferences = state => state
  .getIn(['suggestedOrder', 'orderType']);

export const getOrderTypePreference = (state, type) => state
  .getIn(['suggestedOrder', 'orderType', type]);

export const isOrderTypePreferenceValid = state => state
  .getIn(['suggestedOrder', 'orderType'])
  .includes(true);

export const getMinPeoplePreference = state => state.getIn(['suggestedOrder', 'minPeople']);
