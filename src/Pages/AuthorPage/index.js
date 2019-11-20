import React, { Component } from 'react';
import {  withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row, Col, Tabs, message } from 'antd';
import axios from 'axios';

import Question from 'component/Article/Question';

import styles from './index.module.scss';


const TabPane = Tabs.TabPane;
class AuthorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: {},
      authorArticles: [],
      userShoucangs: [],
    };
  }
  componentDidMount() {
    const { history } = this.props;
    const  { location } = history;
    const path = location.pathname;
    this.getAuthor(path);
  }
  render() {
    if (!this.state.author.star) {
      return null;
    }
    return (
      <div className={ styles.authorPage }>
        <div className={ styles.AuthorTitle }>
          <div className={ styles.authorTitle } style={ { position: 'relative' } }>
            <div style={ { height: '132px' } } />
            <Row style={ { background: '#fff', paddingBottom: '15px' } }>
              <Col span={ 19 } style={ { padding: '1% 2%' } }>
                <h1>
                  <strong>{this.state.author.username}</strong>
                </h1>
                <p>男</p>
                <p>详细资料</p>
              </Col>
            </Row>
          </div>
        </div>
        <div className={ styles.authorContent }>
          <Tabs
            animated={ false }
            defaultActiveKey='1'>
            <TabPane key='1' tab='个人发布'>
              <Question articles={ this.state.authorArticles } />;
            </TabPane>
            <TabPane key='2' tab='收藏'>
              <Question articles={ this.state.userShoucangs.map(item=>item.article) } />;
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
  async getAuthor(path) {
    const res = await axios.get(`/api/${path}`);
    const resDate = res.data;
    if (res.state === 400) {
      message.warning('服务器错误');
      history.push('/*');
      return;
    }
    if (resDate.success) {
      this.setState({
        author: resDate.user,
        authorArticles: resDate.userArticles,
        userShoucangs: resDate.userShoucangs,
      });
    }
  }
}

AuthorPage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(AuthorPage);
