import { push } from 'react-router-redux';

import { createActionTypes, buildGetRequest } from 'common/utils';

const prefix = 'USERS';

export const types = createActionTypes([
  'RECEIVE_USERNAME',
], prefix);

export const actions = {
  receiveUsername: (userId, username) => ({
    type: types.RECEIVE_USERNAME,
    id: userId,
    value: username,
  }),

  fetchUsername: userId => dispatch => {
    fetch(`/api/user/${userId}/name`, buildGetRequest())
      .then(response => {
        if (response.ok) {
          response.json().then(json => {
            dispatch(actions.receiveUsername(json.userId, json.email));
          });
        } else if (response.status === 401) {
          dispatch(push('/login'));
        }
      });
  },
};
