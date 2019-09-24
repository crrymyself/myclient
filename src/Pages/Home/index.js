import React from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';

import styles from './index.module.scss';

const Home = () => (
  <div className={ styles.container }>
    <div className={ styles.content}>
    <Button type="primary">Primary</Button>
        欢迎来到德莱联盟
    </div>
  </div>
);

// Home.propTypes = {
//   i: PropTypes.array,
// }

export default withRouter(Home);
