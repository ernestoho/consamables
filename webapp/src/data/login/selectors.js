export const getUsername = state => state.getIn(['login', 'username']);

export const getPassword = state => state.getIn(['login', 'password']);

export const getConfirmPassword = state => state.getIn(['login', 'confirmPassword']);

export const isLoading = state => state.getIn(['login', 'loading']);

export const getError = state => state.getIn(['login', 'error']);
