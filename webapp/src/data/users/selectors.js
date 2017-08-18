export const getUsername = (state, userId) => state.getIn(['users', userId], '');
