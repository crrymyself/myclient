import React from 'react';
import { Form, Input, Modal, Button } from 'antd';
import PropTypes from 'prop-types';
const { TextArea } = Input;

const FormItem = Form.Item;

const Fabu = ({ form, visible, onSubmit, onCancel }) => {
  const { getFieldDecorator } = form;
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        onSubmit(values);
      }
    });
  };
  const fahandleCancel = e => {
    e.preventDefault();
    if (onCancel) {
      onCancel();
    }
  };
  return (
    <div className='home-page'>
      <Modal
        footer={ null }
        onCancel={ fahandleCancel }
        title='发布文章'
        visible={ visible }>
        <Form
          className='login-form'
          onSubmit={ handleSubmit }
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
                style={ { marginBottom: '10px', height: '300px' } } />,
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
};

Fabu.propTypes = {
  form: PropTypes.object,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  visible: PropTypes.bool,
};

const WrappedNormalLoginForm = Form.create()(Fabu);
export default WrappedNormalLoginForm;
