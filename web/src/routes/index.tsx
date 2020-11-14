import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Extract from '../pages/Extract';
import MyProducts from '../pages/MyProducts';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" component={Dashboard} exact />
    <Route path="/extrato" component={Extract} />
    <Route path="/meus-produtos" component={MyProducts} />
  </Switch>
);

export default Routes;
