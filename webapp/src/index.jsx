import './styles/master.scss';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import { Map } from 'immutable';

import configureStore from './configureStore';
import routes from './routes';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
const container = document.getElementById('container');

render(
    <Provider store={store}>
        <Router history={history} routes={routes} key={Math.random()}/>
    </Provider>,
    container
);

if (module.hot) {
    module.hot.accept();

    module.hot.accept('./reducers/index', () => {
        const nextRootReducer = require('./reducers/index');
        store.replaceReducer(nextRootReducer);
    });
}
