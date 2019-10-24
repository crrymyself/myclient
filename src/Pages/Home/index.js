import React from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';

// import Test from 'component/Test';

// import styles from './index.module.scss';

const Home = () => (
  // <BasicLayout />
  <div>
    <Button type='primary'>Primary</Button>
  </div>
);

// Home.propTypes = {
//   i: PropTypes.array,
// }

export default withRouter(Home);
