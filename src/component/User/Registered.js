import React, { useState } from 'react';
import { Form, Input, Icon, Button, Modal } from 'antd';
import axios from 'axios';
import { message } from 'antd/lib/index';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

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

const  Registered = ({ form, visible, onSubmit, onCancel }) => {
  const [confirmDirty, setConfirmDirty ] = useState(false);
  const [veriNum, setVeriNum] = useState('');
  const [num, setNum] = useState('');
  const { getFieldDecorator } = form;

  const getVerify = () => {
    axios
      .get('/api/zhuce/getNum', {
        params: num,
      })
      .then(val => {
        if (val.data.success) {
          message.success(val.data.message);
          setNum(val.data.verifyNum);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码输入不一致!');
    } else {
      callback();
    }
  };
  const handleConfirmBlur = e => {
    const value = e.target.value;
    if (e.target.type === 'email') {
      setNum(e.target.value);
    }
    if (e.target.name === 'verify') {
      setVeriNum(e.target.value);
    }
    setConfirmDirty(confirmDirty || !!value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {
          username: values.username,
          password: values.password,
          email: values.email,
        };
        onSubmit(data);
      }
    });
  };
  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  const verify = (rule, value, callback) => {
    if (value !== veriNum) {
      callback('验证码输入错误');
    } else {
      callback();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div>
      <Modal
        footer={ null }
        onCancel={ handleCancel }
        title='注册'
        visible={ visible }>
        <Form onSubmit={ handleSubmit }>
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
                onBlur={ handleConfirmBlur }
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
                onBlur={ handleConfirmBlur }
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
                  validator: validateToNextPassword,
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
                onBlur={ handleConfirmBlur }
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
                  validator: compareToFirstPassword,
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
                { validator: verify },
              ],
            })(
              <Input
                name='verify'
                onBlur={ handleConfirmBlur }
                placeholder='请输入验证码'
                style={ { width: '40%', display: 'inline-block' } }
                type='text' />,
            )}
            <Button onClick={ getVerify }>获取验证码</Button>
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
};


Registered.propTypes = {
  form: PropTypes.object,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  visible: PropTypes.bool,
};
const WrappedRegistrationForm = Form.create()(Registered);

export default WrappedRegistrationForm;
