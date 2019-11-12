import React, { Component } from 'react';
import { Layout, BackTop } from 'antd';
import PropTypes from 'prop-types';

import Nav from 'component/GolbalNav';
import styles from './BasicLayout.module.scss';

const { Content, Footer } = Layout;

class Layouts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={ styles.layouts }>
        <div>
          <Nav pathname={ this.props.location.pathname } />
          <Layout className={ styles.layout }>
            <Content>
              <Layout style={ { padding: '24px 0', background: '#fff' } }>
                <Content style={ { padding: '0 24px 0 0', minHeight: 1000 } }>
                  {this.props.children}
                </Content>
              </Layout>
            </Content>
          </Layout>
          <Footer style={ { textAlign: 'center', background: '#fff' } }>
            Things did not change overnight, but I am getting there!
          </Footer>
          <BackTop />
        </div>
      </div>
    );
  }
}

Layouts.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
};

export default Layouts;
