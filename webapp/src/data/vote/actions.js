import { push } from 'react-router-redux';

import { createActionTypes, buildPostRequest } from 'common/utils';

import { groupActions } from '../groups';

const prefix = 'VOTE';

export const types = createActionTypes([
  'SEND_VOTE',
  'VOTE_SUCCESS',
  'VOTE_FAILURE',
], prefix);

export const actions = {
  sendVote: () => ({ type: types.SEND_VOTE }),

  voteSuccess: () => ({ type: types.VOTE_SUCCESS }),

  voteFailure: error => ({
    type: types.VOTE_FAILURE,
    error,
  }),

  submitVote: data => dispatch => {
    dispatch(actions.sendVote());
    fetch('/api/groups/vote', buildPostRequest(data))
      .then(response => {
        if (response.ok) {
          dispatch(actions.voteSuccess());
          dispatch(push('/'));
          dispatch(groupActions.fetchPendingGroups(true));
        } else if (response.status === 401) {
          dispatch(actions.voteFailure('Logged out.'));
          dispatch(push('/login'));
        }
      })
      .catch(error => dispatch(actions.voteFailure(error)));
  },
};
