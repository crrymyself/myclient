/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { /* Redirect, */ Route, Router, Switch } from 'react-router-dom';
import { Result, Spin  } from 'antd';
// import { ConnectedRouter } from 'connected-react-router';
// import pathToRegexp from 'path-to-regexp';
import Loadable from 'react-loadable';

import BasicLayout from 'layouts/BasicLayout';

const loadingPage = ({ error, pastDelay }) => {
  if (error) {
    return (
      <Result
        status='warning'
        title='页面加载错误，请刷新页面' />
    );
  } else if (pastDelay) {
    return (<Spin size='large' />);
  }
  return null;
};

const routeConfig = [
  {
    name: '/',
    path: '/',
    exact: true,
    component: Loadable({
      loader: () => import('./Pages/Articles'),
      loading: loadingPage,
      delay: 200,
    }),
  },
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
    name: 'article/:id',
    path: '/article/:id',
    exact: true,
    component: Loadable({
      loader: () => import('./Pages/Single'),
      loading: loadingPage,
      delay: 200,
    }),
  },
  {
    name: 'author/:userId',
    path: '/author/:userId',
    exact: true,
    component: Loadable({
      loader: () => import('./Pages/AuthorPage'),
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
      {/* {
        routeConfig.map((r, key)=> (
          <Route
            component={ r.component }
            exact={ !!r.exact }
            key={ key }
            path={ r.path } />
        ))
      } */}
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
        {/* <Redirect exact from='/' to='/articles' /> */}
      </BasicLayout>
    </Switch>
  </Router>
);

Routes.propTypes = {
  history: PropTypes.object,
};

export default Routes;
