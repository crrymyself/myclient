import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Avatar, Form, Icon } from 'antd';
const { Meta } = Card;
class Commoent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: {} || this.props.comment,
      comments: [],
    };
  }
  componentDidMount() {

  }
  render() {
    if (!this.state.comment.content) {
      return null;
    }
    return (
      <div className=''>
        <Card bordered={ false }  style={ { marginBottom: '1.5%', borderBottom: '1px solid rgba(26,26,26,.1)' } }>
          <Meta
            avatar={ <Avatar icon={ <Icon type='user' /> } /> }
            description='这个人很闲,什么也没留下'
            style={ { borderBottom: '1px solid #F5F5F5', marginBottom: '10px' } }
            title={ this.state.comment.author.username } />
          <p>{this.state.comment.content}</p>
          <p>发布于:{this.state.comment.createTime}</p>
        </Card>
      </div>
    );
  }
}

Commoent.propTypes = {
  comment: PropTypes.any,
};

const WrappedNormalLoginForm = Form.create()(Commoent);
export default WrappedNormalLoginForm;
