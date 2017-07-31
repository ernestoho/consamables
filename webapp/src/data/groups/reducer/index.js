import { combineReducers } from 'redux';

import active from './active';
import pending from './pending';
import organized from './organized';
import my from './my';

export default combineReducers({
  active,
  pending,
  organized,
  my,
});
