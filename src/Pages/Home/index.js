import React from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// import { Button } from 'antd';

// import Test from 'component/Test';
import BasicLayout from 'layouts/BasicLayout';

// import styles from './index.module.scss';

const Home = () => (
  <BasicLayout />
);

// Home.propTypes = {
//   i: PropTypes.array,
// }

export default withRouter(Home);
