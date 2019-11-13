/* eslint-disable consistent-return */
import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Icon, Menu, Button, Badge, Dropdown, message } from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios';

import Fabu from 'component/Article/Fabu';
import Registered from 'component/User/Registered';
import Login from 'component/User/Login';
import styles from './index.module.scss';

const { Header } = Layout;

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuCurrent: '',
      nav: '文章',
      navTitle: '文章',
      faVisible: false,
      user: {},
      noReadCount: 0,
      registerVisible: false,
      loginVisible: false,
    };
  }
  componentDidMount() {
    this.initMenu(this.props.pathname);
  }

  componentWillReceiveProps(nextProps) {
    this.initMenu(nextProps.pathname);
  }

  render() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const menuDown = (
      <Menu>
        <Menu.Item key='0'>
          <Link to={ '/author/' + userId }>我的主页</Link>
        </Menu.Item>
        <Menu.Item key='1'>
          <Link onClick={ this.userOut } to=''>
            退出
          </Link>
        </Menu.Item>
      </Menu>
    );
    // className={classNames(styles.tagCloud, className)}
    return (
      <Header className={ styles.headerNav }>
        <div className={ styles.headerContent }>
          <Menu
            defaultSelectedKeys={ ['1'] }
            mode='horizontal'
            onClick={ this.handleMenu }
            selectedKeys={ [this.state.menuCurrent] }>
            <Menu.Item key='9'>
              <Link to='/articles'>
                <Icon type='unordered-list' />
                  文章
              </Link>
            </Menu.Item>
            <Menu.Item key='1'>
              <Link to='/about'>
                <Icon type='user' />
                  关于
              </Link>
            </Menu.Item>
          </Menu>
          <div>
            {!token ? null : (
              <Fragment>
                <Link to={ '/msg/' + userId }>
                  <Button
                    onClick={ this.changeNum }
                    type='link'>
                    <Icon type='bell' />
                    <Badge
                      count={ this.state.noReadCount }
                      style={ { boxShadow: '0 0 0 1px #d9d9d9 inset' } } />
                  </Button>
                </Link>
                <a href='###'>
                  <Button onClick={ this.fabuModal } type='link'>
                    <Icon type='edit' />
                  </Button>
                </a>
              </Fragment>
            )}

            {token ? (
              <Dropdown overlay={ menuDown } trigger={ ['click'] }>
                <a
                  className='ant-dropdown-link'
                  href='https://www.baidu.com/'>
                  <Button type='link'>
                    <Icon type='usergroup-delete' />
                  </Button>
                </a>
              </Dropdown>
            ) : (
              <div
                style={ {
                  display: 'flex',
                  justifyContent: 'space-around',
                } }>
                <a className='ant-dropdown-link' href='###' onClick={ this.resModel }>
                  <Button
                    shape='round'
                    size='small'
                    style={ { marginRight: 10 } }
                    type='primary'>
                    注册
                  </Button>
                </a>
                <a className='ant-dropdown-link' href='###' onClick={ this.loginModel }>
                  <Button shape='round' size='small' type='primary'>
                    登录
                  </Button>
                </a>
              </div>
            )}
          </div>
        </div>
        <Fabu
          onCancel={ this.fahandleCancel }
          onSubmit={ this.fabu }
          visible={ this.state.faVisible } />
        <Registered
          onCancel={ this.rehandleCancel }
          onSubmit={ this.register }
          visible={ this.state.registerVisible } />
        <Login
          onCancel={ this.loginhandleCancel }
          onSubmit={ this.login }
          visible={ this.state.loginVisible } />
      </Header>
    );
  }
  initMenu(name) {
    let key = '9';
    let navTitle = '';
    if (name === '/') {
      key = '9';
      navTitle = '文章';
    } else if (name === '/about') {
      key = '1';
      navTitle = '关于';
    }
    this.setState({
      navTitle,
      menuCurrent: key,
    });
  }
  handleMenu = e => {
    this.setState({
      menuCurrent: e.key,
    });
  }

  menuClick = ({ key }) => {
    this.setState({
      nav: key,
    });
  }
  fabu = values => {
    axios
      .post('/api/article/fabu', values)
      .then(value => {
        console.log(value.data.articles);
        if (value.status === 200) {
          if (value.data.success) {
            message.success(value.data.message);
            this.setState({
              faVisible: false,
              confirmLoading: false,
              articels: value.data.articles,
            });
          }
        }
      })
      .catch(value => {
        console.log(value);
        // console.log(2);
      });
  };
  register = values => {
    axios
      .post('/api/user/zhuce', values)
      .then(val => {
        if (val.status === 200) {
          if (val.data.success) {
            return message.success(val.data.message);
          }
          return message.warning(val.data.message);
        }
      })
      .catch(val => {
        message.error(val.data.message);
      });
  };
  login = values => {
    const { history } = this.props;
    axios
      .post('/api/user/login', values)
      .then(val => {
        if (val.data.success) {
          message.success(val.data.message);
          localStorage.setItem('token', val.data.token);
          localStorage.setItem('userId', val.data.userId);
          localStorage.setItem('isOk', true);
          this.setState({
            loginVisible: false,
          });
          history.push('/');
        } else {
          message.warning(val.data.message);
        }
      })
      .catch(val => {
        console.log(val);
        message.error('登录失败');
      });
  };
  fabuModal = () => {
    this.setState({
      faVisible: true,
    });
  };
  resModel = () => {
    this.setState({
      registerVisible: true,
    });
  };
  loginModel = () => {
    this.setState({
      loginVisible: true,
    });
  };

  fahandleCancel = e => {
    console.log(e);
    this.setState({
      faVisible: false,
    });
  };
  rehandleCancel = e => {
    console.log(e);
    this.setState({
      registerVisible: false,
    });
  };
  loginhandleCancel = e => {
    console.log(e);
    this.setState({
      loginVisible: false,
    });
  };
  userOut = e =>{
    e.preventDefault();
    const { history } = this.props;
    axios
      .post('/api/user/out')
      .then(val => {
        if (val.data.success) {
          message.success(val.data.message);
          localStorage.setItem('token', val.data.token);
          localStorage.setItem('userId', val.data.userId);
          localStorage.setItem('isOk', false);
          this.setState({
            user: null,
            noReadCount: 0,
          });
          history.push('/');
        } else {
          message.warning(val.data.message);
        }
      })
      .catch(val => {
        console.log(val);
        message.error('退出失败');
      });
  }
}

Nav.propTypes = {
  history: PropTypes.object,
  pathname: PropTypes.string,
};

export default withRouter(Nav);
