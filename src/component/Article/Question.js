/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
// Link,

import React, { Component } from 'react';
import {  Link } from 'react-router-dom';
import { message, List, Avatar, Icon } from 'antd';
import axios from 'axios/index';

const IconText = ({ type, text, onClick }) => (
  <a href='#' onClick={ onClick } style={ { display: 'inline-block' } }>
    <Icon style={ { marginRight: 8 } } type={ type } />
    {text}
  </a>
);

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      isZanUp: true,
      isZanDown: true,
      isCollection: true,
      collectionid: '',
    };
  }

  render() {
    const { articles } = this.props;
    return (
      <div className='' style={ { borderBottom: '1px solid #f0f2f7' } }>
        <List
          dataSource={ articles }
          itemLayout='vertical'
          pagination={ {
            onChange: page => {
              console.log(page);
            },
            pageSize: 3,
          } }
          renderItem={ item => (
            <List.Item
              actions={ [
                <IconText
                  key='list-vertical-like-o'
                  onClick={ this.state.isCollection ? this.nocollection.bind(this, item._id) : this.collection.bind(this, item.collectionid) }
                  text={ item.collection || 0 }
                  type='star-o' />,
                <IconText
                  key='list-vertical-like-o'
                  onClick={ this.state.isZanUp ? this.zanUp.bind(this, item._id) : this.noUp.bind(this, item._id) }
                  text={ item.up }
                  type='like-o' />,
                <IconText key='list-vertical-message' text='2' type='message' />,
              ] }
              extra={
                <img
                  alt='logo'
                  src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
                  width={ 272 } />
              }
              key={ item.title }>
              <List.Item.Meta
                avatar={ <Avatar src={ item.avatar } /> }
                description={ item.description }
                title={
                  <Link to={ '/article/' + item._id }>
                    {item.title}
                  </Link> } />
              {item.content}
            </List.Item>
          ) }
          size='large' />
      </div>
    );
  }
  async zanUp(articleId) {
    const dee = await axios.get('/api/article/' + articleId + '/zanup');
    const deeDate = dee.data;
    if (deeDate.success) {
      message.success(deeDate.message);
      this.setState({
        isZanUp: !this.state.isZanUp,
        article: deeDate.article,
      });
    }
  }
  async noUp(articleId) {
    const dee = await axios.get('/api/article/' + articleId + '/noup');
    const deeDate = dee.data;
    if (deeDate.success) {
      message.success(deeDate.message);
      this.setState({
        isZanUp: !this.state.isZanUp,
        article: deeDate.article,
      });
    }
  }
  async collection(articleId) {
    const dee = await axios.get('/api/article/' + articleId + '/noshoucang');
    const deeDate = dee.data;
    if (deeDate.success) {
      message.success(deeDate.message);
      this.setState({
        isCollection: !this.state.isCollection,
        collectionid: deeDate.collection,
      });
    }
  }
  async nocollection(articleId) {
    const dee = await axios.get('/api/article/' + articleId + '/shoucang');
    const deeDate = dee.data;
    if (deeDate.success) {
      message.success(deeDate.message);
      this.setState({
        isCollection: !this.state.isCollection,
        collectionid: deeDate.collection,
      });
    }
  }
}

export default MyComponent;
