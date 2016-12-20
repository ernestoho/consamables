import { Map } from 'immutable';

import { SHOW_MODAL, HIDE_MODAL } from '../actions/actionTypes';

const modal = (state = Map({ visible: false }), action) => {
	switch(action.type) {
		case SHOW_MODAL:
			return state.set('visible', true);
		case HIDE_MODAL:
			return state.set('visible', false);
		default:
			return state;
	}
};

export default modal