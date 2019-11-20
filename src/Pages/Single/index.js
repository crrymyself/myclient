/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {  withRouter } from 'react-router-dom';
import { Row, Col, Button, Card, Avatar, Modal, Form, Input, message  } from 'antd';
import axios from 'axios';
import classNames from 'classnames';

import Comment from 'component/Article/Comment';

import styles from './index.module.scss';

const { TextArea } = Input;
const FormItem = Form.Item;
const { Meta } = Card;

class SingleArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articel: {},
      comMan: '',
      Aswer: false,
      comments: [],
      articleByAuthor: [],
      commentByAuthor: [],
      foceLoading: false,
      ArticleLoding: false,
      isGuanAuthor: true,
      isGuanArticle: true,
      articleAuthor: {},
      faVisible: false,
    };
  }

  componentDidMount() {
    console.log('加载了么？');
    const path = this.props.history.location.pathname;
    this.getArticel(path);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    if (!this.state.articel.tags) {
      return null;
    }
    const UserToken = localStorage.getItem('token');
    const ArticleToken = this.state.articel.author.token;
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
                  {this.state.articel.title}
                  {UserToken && (
                    <div>
                      {this.state.isGuanArticle ? (
                        <Button
                          icon='star'
                          loading={ this.state.ArticleLoding }
                          onClick={ this.Tag1.bind(this, this.state.articel._id) }
                          style={ { border: 'none', marginRight: '2.5%' } }
                          type='dashed'>
                          关注问题
                        </Button>
                      ) : (
                        <Button
                          icon='star'
                          loading={ this.state.ArticleLoding }
                          onClick={ this.cancelTag1.bind(
                            this,
                            this.state.articel._id
                          ) }
                          style={ { border: 'none', marginRight: '2.5%' } }
                          type='dashed'>
                          取消关注
                        </Button>
                      )}
                      <Button
                        icon='edit'
                        onClick={ () => this.isAswer() }
                        type='dashed'>
                        写回答
                      </Button>
                      {ArticleToken === UserToken ? (
                        <span>
                          <Button
                            icon='edit'
                            onClick={ this.update.bind(this) }
                            type='dashed'>
                            修改文章
                          </Button>
                          <Button
                            icon='exclamation'
                            onClick={ this.deleteArticle.bind(this) }
                            type='dashed'>
                            删除文章
                          </Button>
                        </span>
                      ) : null}
                    </div>
                  )}
                </h1>
                <p>{this.state.articel.content}</p>
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
                        <Col span={ 7 }>{this.state.articel.author.username}</Col>
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
                          {this.state.commentByAuthor.length}
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
                          {this.state.articleByAuthor.length}
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
                          {this.state.articleAuthor.fans.length}
                        </strong>
                      </Col>
                    </Row>
                    <Row>
                      {UserToken && (
                        <Col span={ 11 }>
                          {this.state.isGuanAuthor ? (
                            <Button
                              icon='plus'
                              loading={ this.state.foceLoading }
                              onClick={ this.guanzhuLoading.bind(
                                this,
                                this.state.articel.author._id
                              ) }
                              style={ { width: '100%' } }
                              type='primary'>
                              关注
                            </Button>
                          ) : (
                            <Button
                              icon='plus'
                              loading={ this.state.foceLoading }
                              onClick={ this.UnguanzhuLoading.bind(
                                this,
                                this.state.articel.author._id
                              ) }
                              style={ { width: '100%' } }
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
            {this.state.Aswer ? (
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
                  title={ this.state.comMan } />
                <Form
                  className='login-form'
                  onSubmit={ this.handleSubmit }
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
              {this.state.comments.map((item, ins) => {
                return <Comment comment={ item } key={ ins } />;
              })}
            </div>
          </Col>
        </div>
        <Modal
          footer={ null }
          onCancel={ this.fahandleCancel.bind(this) }
          title='修改文章'
          visible={ this.state.faVisible }>
          <Form
            className='update-form'
            onSubmit={ this.updateSubmit }
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
                  initialValue: this.state.articel.tags[0],
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
                  initialValue: this.state.articel.tags[1],
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
                  initialValue: this.state.articel.tags[2],
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
                  initialValue: this.state.articel.title,
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
                  initialValue: this.state.articel.content,
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
  }
  async getArticel(path) {
    const res = await axios.get(`/api/${path}`);
    console.log('res---', res);
    const resDate = res.data;
    if (res.state === 400) {
      message.warning('服务器错误');
      history.push('/*');
      return;
    }
    if (resDate.success) {
      this.setState({
        articel: resDate.data,
        comMan: resDate.comMan,
        comments: resDate.comments,
        articleByAuthor: resDate.articleByAuthor,
        commentByAuthor: resDate.commentByAuthor,
        articleAuthor: resDate.data.author,
        isGuanArticle: resDate.isguanArticle,
        isGuanAuthor: resDate.isguanAuthor,
      });
    }
  }
  async Tag1(id) {
    this.setState({
      ArticleLoding: !this.state.ArticleLoding,
    });
    const dee = await axios.get('/api/user/' + id + '/article');
    const deeDate = dee.data;
    if (deeDate.success) {
      message.success(deeDate.message);
      this.setState({
        ArticleLoding: !this.state.ArticleLoding,
        isGuanArticle: !this.state.isGuanArticle,
        articel: deeDate.ArticleStar,
      });
    }
  }

  async cancelTag1(id) {
    this.setState({
      ArticleLoding: !this.state.ArticleLoding,
    });
    const offDee = await axios.get('/api/user/' + id + '/article/cancle');
    const offDeeDate = offDee.data;
    if (offDeeDate.success) {
      message.success(offDeeDate.message);
      this.setState({
        ArticleLoding: !this.state.ArticleLoding,
        isGuanArticle: !this.state.isGuanArticle,
        articel: offDeeDate.ArticleStar,
      });
    }
  }

  async UnguanzhuLoading(authorId) {
    this.setState({
      foceLoading: !this.state.foceLoading,
    });
    const unguan = await axios.get('/api/user/' + authorId + '/unguanzhu');
    const unguanDate = unguan.data;
    if (unguanDate.success) {
      message.success(unguanDate.message);
      this.setState({
        foceLoading: !this.state.foceLoading,
        isGuanAuthor: !this.state.isGuanAuthor,
        articleAuthor: unguanDate.userStar,
      });
    }
  }

  async guanzhuLoading(authorId) {
    this.setState({
      foceLoading: !this.state.foceLoading,
    });
    const guan = await axios.get('/api/user/' + authorId + '/guanzhu');
    const guanDate = guan.data;
    if (guanDate.success) {
      message.success(guanDate.message);
      this.setState({
        foceLoading: !this.state.foceLoading,
        isGuanAuthor: !this.state.isGuanAuthor,
        articleAuthor: guanDate.userStar,
      });
    }
  }

  Tag2() {}
  Tag3() {}

  updateSubmit = e => {
    e.preventDefault();
    const articleid = this.state.articel._id;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios
          .post('/api/article/' + articleid + '/update', values)
          .then(value => {
            if (value.status === 200) {
              if (value.data.success) {
                message.success(value.data.message);
                this.setState({
                  faVisible: !this.state.faVisible,
                  articel: value.data.article,
                });
              }
            }
          })
          .catch(value => {
            console.log(value);
          });
      }
    });
  };
  fahandleCancel() {
    this.setState({
      faVisible: !this.state.faVisible,
    });
  }
  update() {
    this.setState({
      faVisible: !this.state.faVisible,
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (!values.content) {
          message.success('内容不能为空');
          return;
        }
        const Id = this.state.articel._id;
        axios
          .post('/api/article/' + Id + '/comment', values)
          .then(value => {
            if (value.status === 200) {
              if (value.data.success) {
                message.success(value.data.message);
                this.setState({
                  Aswer: false,
                  articel: value.data.article,
                  comments: value.data.comments,
                });
              }
            }
          })
          .catch(value => {
            console.log(value);
          });
      }
    });
  };
  isAswer() {
    this.setState({
      Aswer: !this.state.Aswer,
    });
  }
  deleteArticle() {
    const articleid = this.state.articel._id;
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
}

const WrappedNormalLoginForm = Form.create()(SingleArticle);
export default withRouter(WrappedNormalLoginForm);
