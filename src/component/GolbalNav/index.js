import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Icon, Menu, Row, Col, Button } from 'antd';
import PropTypes from 'prop-types';

import HeaderSearch from 'component/HeadSeach';

import logo from 'assets/favicon.ico';
import styles from './index.module.scss';

const { Header } = Layout;

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuCurrent: '',
      nav: '首页',
      navTitle: '首页',
    };
  }
  componentDidMount() {
    this.initMenu(this.props.pathname);
  }

  componentWillReceiveProps(nextProps) {
    this.initMenu(nextProps.pathname);
  }

  render() {
    return (
      // <div className='left'>
      <Header
        // className='header'
        style={ {
          position: 'fixed',
          zIndex: 1,
          top: 0,
          width: '100%',
          minWidth: '1200px',
          height: '66px',
          float: 'left',
          backgroundColor: 'white',
          borderBottom: '1px solid #eee',
        } }>
        <Row className={ styles.container }>
          <Col span='4'>
            <a href='http://xcwpup.top'>
              <div className='logo '>
                <img alt='' src={ logo } />
              </div>
            </a>
          </Col>
          <Col span='8'>
            <Menu
              defaultSelectedKeys={ ['1'] }
              mode='horizontal'
              onClick={ this.handleMenu }
              selectedKeys={ [this.state.menuCurrent] }
              style={ { lineHeight: '64px', borderBottom: 'none' } }
              theme='light'>
              <Menu.Item key='9'>
                <Link to='/home'>
                  <Icon theme='outlined' type='home' />
                  首页
                </Link>
              </Menu.Item>
              <Menu.Item key='1'>
                <Link to='/articles'>
                  <Icon theme='outlined' type='ordered-list' />
                  文章
                </Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col span='6'>
            <HeaderSearch
              className={ `${styles.action} ${styles.search}` }
              dataSource={ ['搜索提示一', '搜索提示二', '搜索提示三'] }
              onPressEnter={ value => {
                console.log('enter', value) // eslint-disable-line
              } }
              onSearch={ value => {
                console.log('input', value) // eslint-disable-line
              } }
              // eslint-disable-next-line react/jsx-tag-spacing
              placeholder='站内搜索'/>
          </Col>
          <Col span='4'>
            <Button style={ { marginRight: 20 } } type='primary'>
              Login in
            </Button>
            <Button type='primary'>Login out</Button>
          </Col>
        </Row>
      </Header>
      // </div>
    );
  }
  initMenu(name) {
    let key = '9';
    let navTitle = '';
    if (name === '/') {
      key = '9';
      navTitle = '首页';
    } else if (name === '/articles') {
      key = '1';
      navTitle = '文章';
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
}

Nav.propTypes = {
  pathname: PropTypes.string,
};

export default withRouter(Nav);
