import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
// import pathToRegexp from 'path-to-regexp';

import Home from './Pages/Home';

const Routes = ({ history }) => (
  <Router history={ history }>
    <Switch>
      <Route component={ Home } exact path='/home' />
      <Redirect
        exact
        from='/'
        to='/home' />
    </Switch>
  </Router>
);

Routes.propTypes = {
  history: PropTypes.object,
};

export default Routes;
