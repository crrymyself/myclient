import React, { useState } from 'react';
import {  Link } from 'react-router-dom';
import { message, List, Avatar, Icon } from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios/index';

const IconText = ({ type, text, onClick }) => (
  <a href='###' onClick={ onClick } style={ { display: 'inline-block' } }>
    <Icon style={ { marginRight: 8 } } type={ type } />
    {text}
  </a>
);

IconText.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.any,
  type: PropTypes.string,
};

const  Question = ({ articles }) => {
  const [isZanUp, setZanUp] = useState(true);
  const [isCollection, setCollection] = useState(true);
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
                onClick={ () => {
                  isCollection ? nocollection(item._id) : collection(item.collectionid);
                } }
                text={ item.collection || 0 }
                type='star-o' />,
              <IconText
                key='list-vertical-like-o'
                onClick={ () => {
                  isZanUp ? zanUp(item._id) : noUp(item._id);
                } }
                text={ item.up }
                type='like-o' />,
              <IconText key='list-vertical-message' text='2' type='message' />,
            ] }
            extra={
              <img
                alt='logo'
                src='https://p.upyun.com/demo/webp/webp/animated-gif-0.webp'
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
  async function zanUp(articleId) {
    const dee = await axios.get('/api/article/' + articleId + '/zanup');
    const deeDate = dee.data;
    if (deeDate.success) {
      message.success(deeDate.message);
      setZanUp(!isZanUp);
    }
  }
  async function noUp(articleId) {
    const dee = await axios.get('/api/article/' + articleId + '/noup');
    const deeDate = dee.data;
    if (deeDate.success) {
      message.success(deeDate.message);
      setZanUp(!isZanUp);
    }
  }
  async function collection(articleId) {
    const dee = await axios.get('/api/article/' + articleId + '/noshoucang');
    const deeDate = dee.data;
    if (deeDate.success) {
      message.success(deeDate.message);
      setCollection(!isCollection);
    }
  }
  async function nocollection(articleId) {
    const dee = await axios.get('/api/article/' + articleId + '/shoucang');
    const deeDate = dee.data;
    if (deeDate.success) {
      message.success(deeDate.message);
      setCollection(!isCollection);
    }
  }
};

Question.propTypes = {
  articles: PropTypes.array,
};

export default Question;
