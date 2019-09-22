import React from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import styles from './index.css';

const Home = () => (
  <div className={ styles.container }>
    <h1>欢迎来到首页</h1>
    <h2>那就开始把</h2>
  </div>
);

// Home.propTypes = {
//   i: PropTypes.array,
// }

export default withRouter(Home);
