import React from 'react';
import { Layout, Row, Col } from 'antd';
import { Header, Content, Footer } from 'antd/lib/layout/layout';
// component
import  LeftMenu  from '../Menu';
import Frame from '../Frame1';


const { Sider } = Layout
const Home = () => {
  return (
    <Layout className="main-layout">
    <Sider className="all-page-component">
        <div>Logo</div>
        <LeftMenu />
    </Sider>
    <Layout className="all-page-component">
      <Header className="all-page-component">Header</Header>
      <Content>
        <Frame />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  </Layout>
  )
};

export default Home;
