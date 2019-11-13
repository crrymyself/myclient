/* eslint-disable consistent-return */
import React, { Component } from 'react';
import {  withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { message } from 'antd';


import ContentTag from 'component/Article/ContentTag';

class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articels: [],
    };
  }
  componentDidMount() {
    this.getArticelData();
  }

  // componentWillReceiveProps(nextProps) {
  // }

  render() {
    // console.log(this.state.articels);
    return (
      <ContentTag  articles={ this.state.articels } />
    );
  }

  getArticelData = () => {
    const that = this;
    axios.get('/api/getDate').then(res => {
      // console.log('data', data);
      const { data } = res;
      if (data.success) {
        that.setState({
          articels: data.data,
        });
      }
    }).catch(val => {
      message.error(val.data.message);
    });
  }
}

Articles.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Articles);
