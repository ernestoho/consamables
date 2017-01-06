import './styles/master.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Map } from 'immutable';

import App from './components/App';
import configureStore from './configureStore';
import { DISPLAY_DEFAULT } from './constants';

const initialState = {
    activeOrders: Map(),
    pendingOrders: Map(),
    organizedOrders: Map(),
    myOrders: Map(),
    restaurants: Map(),
    menus: Map(),
    items: Map(),
    centerColumn: {
        displayMode: DISPLAY_DEFAULT,
        menuId: -1,
        currentOrder: Map({ items: Map() }),
        suggestOrder: Map(),
        login: Map({ username: '', password: '' }),
        pizzaBuilder: Map({ toppings: Map(), size: 'half' }),
        organizer: Map()
    },
    currentUser: Map({ loggedIn: false }),
    users: Map()
};

const store = configureStore(initialState);
const container = document.getElementById('container');

ReactDOM.render(
    <Provider store={store}>
        <App/>
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
