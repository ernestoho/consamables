import './styles/master.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import { Map } from 'immutable';

import configureStore from './configureStore';
import App from './components/App';
import CenterColumn from './components/centerColumn/CenterColumn';
import Dashboard from './components/centerColumn/Dashboard';
import Login from './components/centerColumn/Login';
import CreateAccount from './components/centerColumn/CreateAccount';
import Menu from './components/centerColumn/Menu';
import Order from './components/centerColumn/Order';
import Suggest from './components/centerColumn/Suggest';
import GroupDetails from './components/centerColumn/GroupDetails';
import OrderDetails from './components/centerColumn/OrderDetails';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
const container = document.getElementById('container');

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Dashboard}/>
                <Route path="login">
                    <IndexRoute component={Login}/>
                    <Route path="create" component={CreateAccount}/>
                </Route>
                <Route path="menu/:id" component={Menu}/>
                <Route path="join/:id" component={Order}/>
                <Route path="start/:id" component={Order}/>
                <Route path="activate/:id" component={Order}/>
                <Route path="suggest/:id" component={Suggest}/>
                <Route path="group-details/:id" component={GroupDetails}/>
                <Route path="order-details/:id" component={OrderDetails}/>
            </Route>
        </Router>
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
