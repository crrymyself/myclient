/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Form, Input, Modal, Button } from 'antd';
const { TextArea } = Input;

const FormItem = Form.Item;

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible } = this.props;
    return (
      <div className='home-page'>
        <Modal
          footer={ null }
          onCancel={ this.fahandleCancel }
          title='发布文章'
          visible={ visible }>
          <Form
            className='login-form'
            onSubmit={ this.handleSubmit }
            style={ { width: '100%', margin: ' 0 auto' } }>
            <FormItem
              lable='标题一'
              style={ {
                width: '30%',
                display: 'inline-block',
                marginRight: '5%',
              } }>
              {getFieldDecorator('tag1', {
                rules: [{ required: true, message: '请输入标签一!' }],
              })(<Input addonBefore='标题' />)}
            </FormItem>
            <FormItem
              lable='标题二'
              style={ {
                width: '30%',
                display: 'inline-block',
                marginRight: '5%',
              } }>
              {getFieldDecorator('tag2', {
                rules: [{ required: true, message: '请输入标签二!' }],
              })(<Input addonBefore='标题' />)}
            </FormItem>
            <FormItem
              lable='标签三'
              style={ { width: '30%', display: 'inline-block' } }>
              {getFieldDecorator('tag3', {
                rules: [{ required: true, message: '请输入标签三!' }],
              })(<Input addonBefore='标题' />)}
            </FormItem>
            <FormItem lable='标题'>
              {getFieldDecorator('title', {
                rules: [{ required: true, message: '请输入标题!' }],
              })(<Input addonBefore='标题' />)}
            </FormItem>
            <FormItem lable='内容'>
              {getFieldDecorator('content', {
                rules: [{ required: true, message: '请输入内容!' }],
              })(
                <TextArea
                  rows={ 4 }
                  style={ { marginBottom: '10px', height: '300px' } } />
              )}
            </FormItem>
            <FormItem>
              <Button
                className='login-form-button'
                htmlType='submit'
                style={ { width: '100%' } }
                type='primary'>
                立即发布
              </Button>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { onSubmit } = this.props;
        onSubmit(values);
      }
    });
  };
  fahandleCancel = e => {
    e.preventDefault();
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
  }
}
const WrappedNormalLoginForm = Form.create()(MyComponent);
export default WrappedNormalLoginForm;
