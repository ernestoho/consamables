export const isCurrentUserLoggedIn = state => state.getIn(['currentUser', 'loggedIn']);

export const getCurrentUsername = state => state.getIn(['currentUser', 'username']);

export const getCurrentUserId = state => state.getIn(['currentUser', 'userId']);
