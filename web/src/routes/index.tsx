import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Extract from '../pages/Extract';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/adicionar" component={Dashboard} />
    <Route path="/extrato" component={Extract} />
  </Switch>
);

export default Routes;
