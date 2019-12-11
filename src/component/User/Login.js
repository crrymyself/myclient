import React, {  useState } from 'react';
import { Form, Input, Icon, Row, Col, Button, Modal } from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const Login = ({ form, visible, onSubmit, onCancel }) => {
  const { confirmDirty } = useState(false);
  const { getFieldDecorator } = form;
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onSubmit(values);
      }
    });
  };
  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: false });
    }
    callback();
  };
  return (
    <div>
      <Modal
        footer={ null }
        onCancel={ handleCancel }
        title='登录'
        visible={ visible }>
        <Row>
          <Form onSubmit={ handleSubmit }>
            <Col>
              <FormItem { ...formItemLayout } hasFeedback label='用户名'>
                {getFieldDecorator('username', {
                  rules: [
                    {
                      required: true,
                      message: '请输入你的名字',
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
                    placeholder='请输入姓名'
                    prefix={
                      <Icon style={ { color: 'rgba(0,0,0,.25)' } } type='user' />
                    } />
                )}
              </FormItem>
            </Col>
            <Col>
              <FormItem { ...formItemLayout } hasFeedback label='密码'>
                {getFieldDecorator('password', {
                  rules: [
                    { required: true, message: '请输入密码!' },
                    { validator: validateToNextPassword },
                    {
                      pattern: new RegExp('^[a-zA-Z][a-zA-Z0-9_]{5,15}$', 'g'),
                      message:
                        '以字母开头，长度在6~18之间，只能包含字母、数字和下划线',
                    },
                  ],
                })(
                  <Input
                    placeholder='请输入密码'
                    prefix={
                      <Icon style={ { color: 'rgba(0,0,0,.25)' } } type='lock' />
                    }
                    type='password' />
                )}
              </FormItem>
            </Col>
            <Col>
              <FormItem>
                <Button
                  htmlType='submit'
                  style={ {
                    width: '300px',
                    borderRadius: '20px',
                    background: 'rgb(52,115,225)',
                    color: '#ffffff',
                  } }>
                  登陆
                </Button>
              </FormItem>
            </Col>
          </Form>
        </Row>
      </Modal>
    </div>
  );
};
Login.propTypes = {
  form: PropTypes.object,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  visible: PropTypes.bool,
};


const LoginSection = Form.create({})(
  Login
);
export default LoginSection;
