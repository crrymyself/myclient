import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
// import pathToRegexp from 'path-to-regexp';

import Home from './Pages/Home';
import Articles from './Pages/Articles';
import BasicLayout from 'layouts/BasicLayout';

const Routes = ({ history }) => (
  <Router history={ history }>
    <Switch>
      <BasicLayout>
        <Route component={ Home } exact path='/home' />
        <Route component={ Articles } exact path='/articles' />
        <Redirect exact from='/' to='/home' />
      </BasicLayout>
    </Switch>
  </Router>
);

Routes.propTypes = {
  history: PropTypes.object,
};

export default Routes;
