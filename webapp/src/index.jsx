import './styles/master.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Map } from 'immutable';

import App from './components/App';
import rootReducer from './reducers'
import { fetchRestaurants, fetchPendingOrders } from './actions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
    activeOrders: Map(),
    pendingOrders: Map(),
    restaurants: Map(),
    menus: Map(),
    modal: Map({
        visible: false
    })
}

const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunkMiddleware))
);

store.dispatch(fetchRestaurants());
store.dispatch(fetchPendingOrders());

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('container')
);
