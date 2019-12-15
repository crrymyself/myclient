import React, { useState, useEffect } from 'react';
import {  withRouter } from 'react-router-dom';
import { Row, Col, Button, Card, Avatar, Modal, Form, Input, message  } from 'antd';
import axios from 'axios';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Comment from 'component/Article/Comment';

import styles from './index.module.scss';

const { TextArea } = Input;
const FormItem = Form.Item;
const { Meta } = Card;

const  SingleArticle = ({ history, form }) => {
  const [ articel, setArticel ] = useState({});
  const [ comMan, setComman ] = useState('');
  const [ Aswer, setAswer ] = useState(false);
  const [ comments, setComments ] = useState([]);
  const [ articleByAuthor, setArticleByAuthor ] = useState([]);
  const [ foceLoading, setFoceLoading ] = useState(false);
  const [ ArticleLoding, setArticleLoading ] = useState(false);
  const [ isGuanArticle, setIsGuanArticle ] = useState(true);
  const [ isGuanAuthor, setIsGuanAuthor ] = useState(true);
  const [ articleAuthor, setArticleAuthor ] = useState({});
  const [ faVisible, setFaVisible ] = useState(false);
  const [ commentByAuthor, setCommentByAuthor ] = useState([]);

  const path = history.location && history.location.pathname;
  const UserToken = localStorage.getItem('token');
  const ArticleToken = articel.author && articel.author.token;

  useEffect(() => {
    getArticel(path);
  }, []);

  const { getFieldDecorator } = form;
  if (!articel.tags) {
    return null;
  }
  return (
    <div className={ styles.articlePage }>
      <div className=''>
        <div className={ classNames(styles.articleTitle, styles.ArticleTitle) }>
          <Row>
            <Col span={ 16 } style={ { marginLeft: '1.3%', marginTop: '2.5%' } }>
              <h1
                style={ {
                  fontWeight: 'bolder',
                  fontSize: '20px',
                  margin: '19px 0',
                } }>
                {articel.title}
                {UserToken && (
                  <div>
                    {isGuanArticle ? (
                      <Button
                        icon='star'
                        loading={ ArticleLoding }
                        onClick={ () => { Tag1(articel._id); } }
                        style={ { border: 'none', marginRight: '2.5%' } }
                        type='dashed'>
                          关注问题
                      </Button>
                    ) : (
                      <Button
                        icon='star'
                        loading={ ArticleLoding }
                        onClick={ () => { cancelTag1( articel._id); } }
                        style={ { border: 'none', marginRight: '2.5%' } }
                        type='dashed'>
                          取消关注
                      </Button>
                    )}
                    <Button
                      icon='edit'
                      onClick={ () => { isAswer(); } }
                      type='dashed'>
                        写回答
                    </Button>
                    {ArticleToken === UserToken ? (
                      <span>
                        <Button
                          icon='edit'
                          onClick={ () => { update(); } }
                          type='dashed'>
                            修改文章
                        </Button>
                        <Button
                          icon='exclamation'
                          onClick={ () => { deleteArticle();  } }
                          type='dashed'>
                            删除文章
                        </Button>
                      </span>
                    ) : null}
                  </div>
                )}
              </h1>
              <p>{ articel.content }</p>
            </Col>
            <Col span={ 6 } style={ { marginRight: '1.3%', marginTop: '2.5%' } }>
              {UserToken !== ArticleToken ? (
                <Card
                  bordered={ false }
                  style={ {
                    marginBottom: '1.5%',
                    boxShadow: '0 1px 3px rgba(26,26,26,.1)',
                  } }>
                  <Meta
                    style={ {
                      borderBottom: '1px solid rgba(26,26,26,.1)',
                      marginBottom: '10px',
                    } } />
                  <div>
                    <Row
                      style={ {
                        padding: '5% 0',
                        borderBottom: '1px solid rgba(26,26,26,.1) ',
                      } }>
                      <Col span={ 9 }>
                        <Avatar
                          icon='user'
                          style={ { backgroundColor: '#87d068' } } />
                      </Col>
                      <Col span={ 7 }>{ articel.author && articel.author.username}</Col>
                    </Row>
                  </div>
                  <Row style={ { textAlign: 'center', padding: '4% 0' } }>
                    <Col span={ 8 }>
                      <div>回答</div>
                      <strong
                        style={ {
                          display: 'inline-block',
                          fontSize: '18px',
                          color: '#1a1a1a',
                          fontWeight: '600',
                        } }>
                        { commentByAuthor.length }
                      </strong>
                    </Col>
                    <Col span={ 8 }>
                      <div>文章</div>
                      <strong
                        style={ {
                          display: 'inline-block',
                          fontSize: '18px',
                          color: '#1a1a1a',
                          fontWeight: '600',
                        } }>
                        { articleByAuthor.length }
                      </strong>
                    </Col>
                    <Col span={ 8 }>
                      <div>关注者</div>
                      <strong
                        style={ {
                          display: 'inline-block',
                          fontSize: '18px',
                          color: '#1a1a1a',
                          fontWeight: '600',
                        } }>
                        { articleAuthor.fans && articleAuthor.fans.length }
                      </strong>
                    </Col>
                  </Row>
                  <Row>
                    {UserToken && (
                      <Col span={ 11 }>
                        { isGuanAuthor ? (
                          <Button
                            icon='plus'
                            loading={ foceLoading }
                            onClick={ () => { guanzhuLoading( articel.author._id ); } }
                            style={ { width: '100%' } }
                            type='primary'>
                              关注
                          </Button>
                        ) : (
                          <Button
                            icon='plus'
                            loading={ foceLoading }
                            onClick={ () => { UnguanzhuLoading( articel.author._id ); } }
                            type='primary'>
                              取消关注
                          </Button>
                        )}
                      </Col>
                    )}
                  </Row>
                </Card>
              ) : null}
            </Col>
          </Row>
        </div>
      </div>
      <div className={ styles.ArticleCotent }>
        <Col span={ 16 }>
          { Aswer ? (
            <Card bordered={ false } style={ { marginBottom: '1.5%' } }>
              <Meta
                avatar={
                  <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                }
                description='This is the description'
                style={ {
                  borderBottom: '1px solid rgba(26,26,26,.1)',
                  marginBottom: '10px',
                } }
                title={ comMan } />
              <Form
                className='login-form'
                onSubmit={ handleSubmit }
                style={ { width: '100%', margin: ' 0 auto' } }>
                <FormItem lable='内容' style={ { marginBottom: '0' } }>
                  {getFieldDecorator(
                    'content1',
                    {
                      initialValue: '',
                    },
                    {
                      rules: [{ required: true, message: '请输入内容!' }],
                    }
                  )(<TextArea rows={ 4 } style={ { border: 'none' } } />)}
                </FormItem>
                <FormItem style={ { marginBottom: '0' } }>
                  <Button
                    className='login-form-button'
                    htmlType='submit'
                    style={ { float: 'right' } }
                    type='primary'>
                      立即回复
                  </Button>
                </FormItem>
              </Form>
            </Card>
          ) : null}
          <div style={ { background: '#fff' } }>
            { comments.map((item, ins) => {
              return <Comment comment={ item } key={ ins } />;
            })}
          </div>
        </Col>
      </div>
      <Modal
        footer={ null }
        onCancel={ () => { fahandleCancel(); } }
        title='修改文章'
        visible={ faVisible }>
        <Form
          className='update-form'
          onSubmit={ () => { updateSubmit(); } }
          style={ { width: '100%', margin: ' 0 auto' } }>
          <FormItem
            lable='标题一'
            style={ {
              width: '30%',
              display: 'inline-block',
              marginRight: '5%',
            } }>
            {getFieldDecorator(
              'tag1',
              {
                initialValue: articel.tags && articel.tags[0],
              },
              {
                rules: [{ required: true, message: '请输入标签一!' }],
              }
            )(<Input addonBefore='标题' />)}
          </FormItem>
          <FormItem
            lable='标题二'
            style={ {
              width: '30%',
              display: 'inline-block',
              marginRight: '5%',
            } }>
            {getFieldDecorator(
              'tag2',
              {
                initialValue: articel.tags && articel.tags[1],
              },
              {
                rules: [{ required: true, message: '请输入标签二!' }],
              }
            )(<Input addonBefore='标题' />)}
          </FormItem>
          <FormItem
            lable='标签三'
            style={ { width: '30%', display: 'inline-block' } }>
            {getFieldDecorator(
              'tag3',
              {
                initialValue: articel.tags && articel.tags[2],
              },
              {
                rules: [{ required: true, message: '请输入标签三!' }],
              }
            )(<Input addonBefore='标题' />)}
          </FormItem>
          <FormItem lable='标题'>
            {getFieldDecorator(
              'title',
              {
                initialValue: articel.title,
              },
              {
                rules: [{ required: true, message: '请输入标题!' }],
              }
            )(<Input addonBefore='标题' />)}
          </FormItem>
          <FormItem lable='内容'>
            {getFieldDecorator(
              'content',
              {
                initialValue: articel.content,
              },
              {
                rules: [{ required: true, message: '请输入内容!' }],
              }
            )(
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
                修改文章
            </Button>
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
  async function getArticel(pathname) {
    const res = await axios.get(`/api${pathname}`);
    console.log('res---', res);
    const resDate = res.data;
    if (res.state === 400) {
      message.warning('服务器错误');
      history.push('/*');
      return;
    }
    if (resDate.success) {
      setArticel(resDate.data);
      setComman(resDate.comMan);
      setComments(resDate.comments);
      setArticleByAuthor(resDate.articleByAuthor);
      setCommentByAuthor(resDate.commentByAuthor);
      setArticleAuthor(resDate.data.author);
      setIsGuanArticle(resDate.isguanArticle);
      setIsGuanAuthor(resDate.isguanAuthor);
    }
  }
  async function Tag1(id) {
    setArticleLoading(!ArticleLoding);
    const dee = await axios.get('/api/user/' + id + '/article');
    const deeDate = dee.data;
    if (deeDate.success) {
      message.success(deeDate.message);
      setArticleLoading(!ArticleLoding);
      setIsGuanArticle(!isGuanArticle);
      setArticel(deeDate.ArticleStar);
    }
  }

  async function cancelTag1(id) {
    setArticleLoading(!ArticleLoding);
    const offDee = await axios.get('/api/user/' + id + '/article/cancle');
    const offDeeDate = offDee.data;
    if (offDeeDate.success) {
      message.success(offDeeDate.message);
      setArticleLoading(!ArticleLoding);
      setIsGuanArticle(!isGuanArticle);
      setArticel(offDeeDate.ArticleStar);
    }
  }

  async function UnguanzhuLoading(authorId) {
    setFoceLoading(!foceLoading);
    const unguan = await axios.get('/api/user/' + authorId + '/unguanzhu');
    const unguanDate = unguan.data;
    if (unguanDate.success) {
      message.success(unguanDate.message);
      setFoceLoading(!foceLoading);
      setIsGuanAuthor(!isGuanAuthor);
      setArticleAuthor(unguanDate.userStar);
    }
  }

  async function guanzhuLoading(authorId) {
    setFoceLoading(!foceLoading);
    const guan = await axios.get('/api/user/' + authorId + '/guanzhu');
    const guanDate = guan.data;
    if (guanDate.success) {
      message.success(guanDate.message);
      setFoceLoading(!foceLoading);
      setIsGuanAuthor(!isGuanAuthor);
      setArticleAuthor(guanDate.userStar);
    }
  }

  function updateSubmit(e) {
    e.preventDefault();
    const articleid = articel._id;
    form.validateFields((err, values) => {
      if (!err) {
        axios
          .post('/api/article/' + articleid + '/update', values)
          .then(value => {
            if (value.status === 200) {
              if (value.data.success) {
                message.success(value.data.message);
                setFaVisible(!faVisible);
                setArticel(value.data.article);
              }
            }
          })
          .catch(value => {
            console.log(value);
          });
      }
    });
  }
  function fahandleCancel() {
    setFaVisible(!faVisible);
  }
  function update() {
    setFaVisible(!faVisible);
  }
  function handleSubmit(e) {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        if (!values.content) {
          message.success('内容不能为空');
          return;
        }
        const Id = articel._id;
        axios
          .post('/api/article/' + Id + '/comment', values)
          .then(value => {
            if (value.status === 200) {
              if (value.data.success) {
                message.success(value.data.message);
                setAswer(false);
                setArticel(value.data.article);
                setComments(value.data.comments);
              }
            }
          })
          .catch(value => {
            console.log(value);
          });
      }
    });
  }
  function isAswer() {
    setArticel(!Aswer);
  }
  function deleteArticle() {
    const articleid = articel._id;
    axios
      .post('/api/article/' + articleid + '/delete')
      .then(value => {
        if (value.status === 200) {
          if (value.data.success) {
            message.success(value.data.message);
            history.push('/');
          }
        }
      })
      .catch(value => {
        console.log(value);
      });
  }
};

SingleArticle.propTypes = {
  form: PropTypes.object,
  history: PropTypes.object,
};


const WrappedNormalLoginForm = Form.create()(SingleArticle);
export default withRouter(WrappedNormalLoginForm);
