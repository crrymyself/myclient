/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {  Redirect, Route, Router, Switch } from 'react-router-dom';
// import { ConnectedRouter } from 'connected-react-router';
// import pathToRegexp from 'path-to-regexp';
import Loadable from 'react-loadable';

import BasicLayout from 'layouts/BasicLayout';

const loadingPage = ({ error, pastDelay }) => {
  if (error) {
    return (
      <div>Error!</div>
    );
  } else if (pastDelay) {
    return <div />;
  }
  return null;
};

const routeConfig = [
  {
    name: 'articles',
    path: '/articles',
    exact: true,
    component: Loadable({
      loader: () => import('./Pages/Articles'),
      loading: loadingPage,
      delay: 200,
    }),
  },
  {
    name: 'about',
    path: '/about',
    exact: true,
    component: Loadable({
      loader: () => import('./Pages/AboutUs'),
      loading: loadingPage,
      delay: 200,
    }),
  },
];
const Routes = ({ history }) => (
  <Router history={ history }>
    <Switch>
      <BasicLayout>
        {
          routeConfig.map((r, key)=> (
            <Route
              component={ r.component }
              exact={ !!r.exact }
              key={ key }
              path={ r.path } />
          ))
        }
        <Redirect exact from='/' to='/articles' />
      </BasicLayout>
    </Switch>
  </Router>
);

Routes.propTypes = {
  history: PropTypes.object,
};

export default Routes;
