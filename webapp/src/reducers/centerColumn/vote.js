import { Map } from 'immutable';

import { SET_DRIVING_PREFERENCE, SET_WAIT_TIME } from '../../actions/actionTypes';

const vote = (state = Map({ driving: false, waitTime: 30 }), action) => {
	switch (action.type) {
		case SET_DRIVING_PREFERENCE:
			if (action.mode == 'vote') {
				return state.set('driving', action.value);
			}
			return state;

		case SET_WAIT_TIME:
			if (action.mode == 'vote') {
				return state.set('waitTime', action.value);
			}
			return state;

		default:
			return state;
	}
};

export default vote
