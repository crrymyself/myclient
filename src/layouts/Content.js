import React, { Fragment } from 'react';
import PropTypes from 'prop-types';


const RouterContent = ({ children }) => (
  <Fragment>{children}</Fragment>
);

RouterContent.propTypes = {
  children: PropTypes.any,
};

export default RouterContent;
