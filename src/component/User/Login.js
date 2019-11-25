/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Form, Input, Icon, Row, Col, Button, Modal } from 'antd';

const FormItem = Form.Item;

@Form.create()
class LoginSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
    };
  }

  render() {
    const { getFieldDecorator } = this.props.form;
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
    const { visible } = this.props;
    return (
      <div>
        <Modal
          footer={ null }
          onCancel={ this.handleCancel }
          title='登录'
          visible={ visible }>
          <Row>
            <Form onSubmit={ this.handleSubmit }>
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
                      { validator: this.validateToNextPassword },
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
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { onSubmit } = this.props;
        onSubmit(values);
      }
    });
  };
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: false });
    }
    callback();
  };
  handleCancel = () => {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
  }
}
// LoginSection = Form.create({})(
//   LoginSection
// );
export default LoginSection;
