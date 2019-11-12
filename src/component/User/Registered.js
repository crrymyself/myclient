/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Form, Input, Icon, Button, Modal } from 'antd';
import axios from 'axios';
import { message } from 'antd/lib/index';

const FormItem = Form.Item;

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      veriNum: '',
      num: '',
    };
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const { visible } = this.props;
    return (
      <div>
        <Modal
          footer={ null }
          onCancel={ this.handleCancel }
          title='注册'
          visible={ visible }>
          <Form onSubmit={ this.handleSubmit.bind(this) }>
            <FormItem { ...formItemLayout } hasFeedback label='邮箱'>
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: '请输入正确的邮箱号!',
                    whitespace: true,
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              })(
                <Input
                  name='email'
                  onBlur={ this.handleConfirmBlur }
                  placeholder='请输入邮箱号'
                  prefix={
                    <Icon style={ { color: 'rgba(0,0,0,.25)' } } type='twitter' />
                  }
                  type='email' />,
              )}
            </FormItem>
            <FormItem { ...formItemLayout } hasFeedback label='用户名'>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: '请输入您的用户名!',
                    whitespace: true,
                  },
                  { min: 2, message: '长度不在范围内' },
                  {
                    pattern: new RegExp('^[\u4E00-\u9FA5A-Za-z]+$', 'g'),
                    message: '用户名必须为英文字母或者中文',
                  },
                ],
              })(
                <Input
                  name='username'
                  onBlur={ this.handleConfirmBlur }
                  placeholder='请输入用户名'
                  prefix={
                    <Icon style={ { color: 'rgba(0,0,0,.25)' } } type='user' />
                  } />,
              )}
            </FormItem>
            <FormItem { ...formItemLayout } hasFeedback label='密码'>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请输入密码!',
                    whitespace: true,
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                  {
                    pattern: new RegExp('^[a-zA-Z][a-zA-Z0-9_]{5,15}$', 'g'),
                    message:
                      '以字母开头，长度在6~18之间，只能包含字母、数字和下划线',
                  },
                ],
              })(
                <Input
                  name='password'
                  onBlur={ this.handleConfirmBlur }
                  placeholder='请输入密码'
                  prefix={
                    <Icon style={ { color: 'rgba(0,0,0,.25)' } } type='lock' />
                  }
                  type='password' />,
              )}
            </FormItem>
            <FormItem { ...formItemLayout } hasFeedback label='再次输入密码'>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: '请再次输入密码!',
                    whitespace: true,
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                  {
                    pattern: new RegExp('^[a-zA-Z][a-zA-Z0-9_]{5,15}$', 'g'),
                    message:
                      '以字母开头，长度在6~18之间，只能包含字母、数字和下划线',
                  },
                ],
              })(
                <Input
                  placeholder='请确认密码'
                  prefix={
                    <Icon style={ { color: 'rgba(0,0,0,.25)' } } type='lock' />
                  }
                  type='password' />,
              )}
            </FormItem>
            <FormItem { ...formItemLayout } label='验证码'>
              {getFieldDecorator('verify', {
                rules: [
                  { required: true, message: '不能为空', whitespace: true },
                  { validator: this.verify.bind(this) },
                ],
              })(
                <Input
                  name='verify'
                  onBlur={ this.handleConfirmBlur }
                  placeholder='请输入验证码'
                  style={ { width: '40%', display: 'inline-block' } }
                  type='text' />,
              )}
              <Button onClick={ this.getVerify }>获取验证码</Button>
            </FormItem>
            <FormItem { ...tailFormItemLayout }>
              <Button
                htmlType='submit'
                style={ {
                  width: '300px',
                  borderRadius: '20px',
                  background: 'rgb(52,115,225)',
                  color: '#ffffff',
                } }>
                注册
              </Button>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }

  getVerify = () => {
    const num = this.state.num;
    axios
      .get('/zhuce/getNum', {
        params: num,
      })
      .then(val => {
        if (val.data.success) {
          message.success(val.data.message);
          this.setState({
            veriNum: val.data.verifyNum,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码输入不一致!');
    } else {
      callback();
    }
  }
  handleConfirmBlur = e => {
    const value = e.target.value;
    if (e.target.type === 'email') {
      this.setState({
        num: e.target.value,
      });
    }
    if (e.target.name === 'verify') {
      this.setState({
        veriNum: e.target.value,
      });
    }
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {
          username: values.username,
          password: values.password,
          email: values.email,
        };
        const { onSubmit } = this.props;
        onSubmit(data);
      }
    });
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  verify = (rule, value, callback) => {
    if (value !== this.state.veriNum) {
      callback('验证码输入错误');
    } else {
      callback();
    }
  }
  handleCancel = () => {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
  }
}
const WrappedRegistrationForm = Form.create()(MyComponent);

export default WrappedRegistrationForm;
