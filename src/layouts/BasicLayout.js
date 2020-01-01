import React from 'react';
import { Layout, BackTop } from 'antd';
import PropTypes from 'prop-types';

import Loadable from 'utils/loading';
import Nav from 'component/GolbalNav';

const RouterContent = Loadable(() => import('./Content'));

const { Content, Footer } = Layout;

const layoutCss = {
  width: '70%',
  margin: '80px auto 20px auto',
  background: '#fff',
};

const Layouts = ({ children, location }) => {
  return (
    <div>
      <Nav pathname={ location.pathname } />
      <Layout style={ layoutCss } >
        <Content>
          <Layout style={ { background: '#fff' } }>
            <Content style={ { padding: '0 24px 0 0', minHeight: 1000 } }>
              <RouterContent>
                {children}
              </RouterContent>
            </Content>
          </Layout>
        </Content>
      </Layout>
      <Footer style={ { textAlign: 'center', background: '#fff' } }>
            Things did not change overnight, but I am getting there!
      </Footer>
      <BackTop />
    </div>
  );
};

Layouts.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
};

export default Layouts;
