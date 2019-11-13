import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
// import pathToRegexp from 'path-to-regexp';

import Articles from './Pages/Articles';
import AboutUs from './Pages/AboutUs';
import BasicLayout from 'layouts/BasicLayout';

const Routes = ({ history }) => (
  <Router history={ history }>
    <Switch>
      <BasicLayout>
        <Route component={ Articles } exact path='/articles' />
        <Route component={ AboutUs } exact path='/about' />
        <Redirect exact from='/' to='/articles' />
      </BasicLayout>
    </Switch>
  </Router>
);

Routes.propTypes = {
  history: PropTypes.object,
};

export default Routes;
