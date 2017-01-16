import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import CenterColumn from './components/centerColumn/CenterColumn';
import Dashboard from './components/centerColumn/Dashboard';
import Login from './components/centerColumn/Login';
import CreateAccount from './components/centerColumn/CreateAccount';
import SplitwiseAuthenticate from './components/centerColumn/SplitwiseAuthenticate';
import Menu from './components/centerColumn/Menu';
import Order from './components/centerColumn/Order';
import Suggest from './components/centerColumn/Suggest';
import Vote from './components/centerColumn/Vote';
import GroupDetails from './components/centerColumn/GroupDetails';
import OrderDetails from './components/centerColumn/OrderDetails';

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Dashboard}/>
        <Route path="login">
            <IndexRoute component={Login}/>
            <Route path="create" component={CreateAccount}/>
            <Route path="splitwise-auth" component={SplitwiseAuthenticate}/>
        </Route>
        <Route path="menu/:id" component={Menu}/>
        <Route path="join/:id" component={Order}/>
        <Route path="start/:id" component={Order}/>
        <Route path="activate/:id" component={Order}/>
        <Route path="suggest/:id" component={Suggest}/>
        <Route path="vote/:id" component={Vote}/>
        <Route path="group-details/:id" component={GroupDetails}/>
        <Route path="order-details/:id" component={OrderDetails}/>
    </Route>
);

export default routes
