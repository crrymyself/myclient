import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card, Avatar, Form, Icon } from 'antd';
const { Meta } = Card;


const Commoent = ({ comment }) =>
  (<Fragment>
    {
      comment.content && (
        <Card bordered={ false }  style={ { marginBottom: '1.5%', borderBottom: '1px solid rgba(26,26,26,.1)' } }>
          <Meta
            avatar={ <Avatar icon={ <Icon type='user' /> } /> }
            description='这个人很闲,什么也没留下'
            style={ { borderBottom: '1px solid #F5F5F5', marginBottom: '10px' } }
            title={ comment.author.username } />
          <p>{ comment.content}</p>
          <p>发布于:{comment.createTime}</p>
        </Card>
      )
    }
  </Fragment>);

Commoent.propTypes = {
  comment: PropTypes.any,
};

const WrappedNormalLoginForm = Form.create()(Commoent);
export default WrappedNormalLoginForm;
