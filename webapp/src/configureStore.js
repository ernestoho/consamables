import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from 'data/rootReducer';

export default () => createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    routerMiddleware(browserHistory),
  )),
);
