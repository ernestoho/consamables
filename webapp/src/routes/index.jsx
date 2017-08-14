import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../ui/App';
import Dashboard from './Dashboard';
import Login from './Login';
import CreateAccount from './CreateAccount';
import SplitwiseAuth from './SplitwiseAuth';
import Menu from './Menu';
import Order from './Order';
import Suggest from './Suggest';
import Vote from './Vote';
import GroupDetails from './GroupDetails';
import OrderDetails from './OrderDetails';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Dashboard} />
    <Route path="login">
      <IndexRoute component={Login} />
      <Route path="create" component={CreateAccount} />
      <Route path="splitwise-auth" component={SplitwiseAuth} />
    </Route>
    <Route path="menu/:id" component={Menu} />
    <Route path="join/:id" component={Order} />
    <Route path="start/:id" component={Order} />
    <Route path="activate/:id" component={Order} />
    <Route path="suggest/:id" component={Suggest} />
    <Route path="vote/:id" component={Vote} />
    <Route path="group-details/:id" component={GroupDetails} />
    <Route path="order-details/:id" component={OrderDetails} />
  </Route>
);

export default routes;
