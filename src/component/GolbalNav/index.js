/* eslint-disable react/prop-types */
/* eslint-disable no-irregular-whitespace */
import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Icon, Menu, Button, Badge, Dropdown, message } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import Loadable from 'react-loadable';

// import Fabu from 'component/Article/Fabu';
// import Registered from 'component/User/Registered';
// import Login from 'component/User/Login';
import styles from './index.module.scss';
import { postLogin } from 'modules/user/action';


const loadingPage = ({ error, pastDelay }) => {
  if (error) {
    return (
      <div>Error!</div>
    );
  } else if (pastDelay) {
    return <div />;
  }
  return null;
};

const Fabu = Loadable({
  loader: () => import('../../component/Article/Fabu'),
  loading: loadingPage,
  delay: 200,
});
const Registered = Loadable({
  loader: () => import('../../component/User/Registered'),
  loading: loadingPage,
  delay: 200,
});
const Login = Loadable({
  loader: () => import('../../component/User/Login'),
  loading: loadingPage,
  delay: 200,
});


const { Header } = Layout;


const  Nav  =  ({ pathname, history, onPostLogin  }) =>  {
  const [ menuCurrent, setmenuCuttent ] = useState('');
  // const { nav, setNav } = useState('文章');
  // const { navTitle, setNavTitle } = useState('文章');
  const [ faVisible, setFaVisible ] = useState(false);
  // const { user, setUser } = useState({});
  const [ noReadCount, setNoReadCount ] = useState(0);
  const [ registerVisible, setRegisterVisible ] = useState(false);
  const [ loginVisible, setLoginVisible ] = useState(false);
  // const { confirmLoading, setConfirmLoading } = useState(false);
  // const { articels, setArticels } = useState([]);

  const initMenu = name => {
    let key = '9';
    let title = '';
    if (name === '/') {
      key = '9';
      title = '文章';
    } else if (name === '/about') {
      key = '1';
      title = '关于';
    }
    // setNavTitle(title);
    console.log(title);
    setmenuCuttent(key);
  };
  const userOut = e =>{
    e.preventDefault();
    axios
      .post('/api/user/out')
      .then(val => {
        if (val.data.success) {
          message.success(val.data.message);
          localStorage.setItem('token', val.data.token);
          localStorage.setItem('userId', val.data.userId);
          localStorage.setItem('isOk', false);
          // setUser(null);
          setNoReadCount(0);
          history.push(pathname);
        } else {
          message.warning(val.data.message);
        }
      })
      .catch(val => {
        console.log(val);
        message.error('退出失败');
      });
  };
  const handleMenu = e => {
    setmenuCuttent(e.key);
  };
  // const menuClick = ({ key }) => {
  //   setNav(key);
  // };
  const fabu = values => {
    axios
      .post('/api/article/fabu', values)
      .then(value => {
        if (value.status === 200) {
          if (value.data.success) {
            message.success(value.data.message);
            setFaVisible(false);
            // setConfirmLoading(false);
            // setArticels(value.data.articles);
          }
        }
      })
      .catch(value => {
        console.log(value);
        // console.log(2);
      });
  };

  const register = values => {
    axios
      .post('/api/user/zhuce', values)
      .then(val => {
        if (val.status === 200) {
          if (val.data.success) {
            return message.success(val.data.message);
          }
        }
        return message.warning(val.data.message);
      })
      .catch(val => {
        message.error(val.data.message);
      });
  };
  const login = values => {
    console.log('pathname', pathname);
    onPostLogin(values, () => {
      setLoginVisible(false);
      history.push(pathname);
    });
  };
  const fabuModal = () => {
    setFaVisible(true);
  };
  const resModel = () => {
    setRegisterVisible(true);
  };

  const loginModel = () => {
    setLoginVisible(true);
  };
  const fahandleCancel = e => {
    console.log(e);
    setFaVisible(false);
  };
  const rehandleCancel = e => {
    console.log(e);
    setRegisterVisible(false);
  };

  const loginhandleCancel = e => {
    console.log(e);
    setLoginVisible(false);
  };
  useEffect(() => {
    initMenu(pathname);
  });
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const menuDown = (
    <Menu>
      <Menu.Item key='0'>
        <Link to={ '/author/' + userId }>我的主页</Link>
      </Menu.Item>
      <Menu.Item key='1'>
        <Link onClick={ userOut } to=''>
            退出
        </Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <Header className={ styles.headerNav }>
      <div className={ styles.headerContent }>
        <Menu
          defaultSelectedKeys={ ['1'] }
          mode='horizontal'
          onClick={ handleMenu }
          selectedKeys={ [menuCurrent] }>
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
                  // onClick={ changeNum }
                  type='link'>
                  <Icon type='bell' />
                  <Badge
                    count={ noReadCount }
                    style={ { boxShadow: '0 0 0 1px #d9d9d9 inset' } } />
                </Button>
              </Link>
              <a href='###'>
                <Button onClick={ fabuModal } type='link'>
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
              <a className='ant-dropdown-link' href='###' onClick={ resModel }>
                <Button
                  shape='round'
                  size='small'
                  style={ { marginRight: 10 } }
                  type='primary'>
                    注册
                </Button>
              </a>
              <a className='ant-dropdown-link' href='###' onClick={ loginModel }>
                <Button shape='round' size='small' type='primary'>
                    登录
                </Button>
              </a>
            </div>
          )}
        </div>
      </div>
      <Fabu
        onCancel={ fahandleCancel }
        onSubmit={ fabu }
        visible={ faVisible } />
      <Registered
        onCancel={ rehandleCancel }
        onSubmit={ register }
        visible={ registerVisible } />
      <Login
        onCancel={ loginhandleCancel }
        onSubmit={ login }
        visible={ loginVisible } />
    </Header>
  );
};

Nav.propTypes = {
  history: PropTypes.object,
  onPostLogin: PropTypes.func,
  pathname: PropTypes.string,
};

const newNav = connect(
  () => ({}),
  dispatch => ({
    onPostLogin: (payload, cb) => dispatch(postLogin.start(payload, cb)),
  }),
)(Nav);


export default withRouter(newNav);
