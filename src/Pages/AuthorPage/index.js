import React, { useState, useEffect } from 'react';
import {  withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row, Col, Tabs, message } from 'antd';
import axios from 'axios';

import Question from 'component/Article/Question';

import styles from './index.module.scss';
const TabPane = Tabs.TabPane;


const AuthorPage = ({ history }) => {
  const [ author, setAuthor ] = useState({});
  const [ authorArticles, setAuthorArticles ] = useState([]);
  const [ userShoucangs, setUserShowcangs ] = useState([]);
  const path = location.pathname;
  useEffect(() => {
    getAuthor(path);
  }, []);
  if (!author.star) {
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
                <strong>{ author.username }</strong>
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
            <Question articles={ authorArticles } />;
          </TabPane>
          <TabPane key='2' tab='收藏'>
            <Question articles={ userShoucangs.map(item=>item.article) } />;
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
  async function getAuthor(pathname) {
    const res = await axios.get(`/api/${pathname}`);
    const resDate = res.data;
    if (res.state === 400) {
      message.warning('服务器错误');
      history.push('/*');
      return;
    }
    if (resDate.success) {
      setAuthorArticles(resDate.userArticles);
      setUserShowcangs(resDate.userShoucangs);
      setAuthor(resDate.user);
    }
  }
};

AuthorPage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(AuthorPage);
