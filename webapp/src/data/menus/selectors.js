import { List } from 'immutable';

export const getMenu = (state, id) => state.getIn(['menus', id], List());
