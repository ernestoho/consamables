import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { selectLocationState } from 'data/routing';

import configureStore from './configureStore';
import routes from './routes';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store, { selectLocationState });
const container = document.getElementById('container');

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  container,
);

module.hot.accept();
