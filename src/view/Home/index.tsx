import React from 'react';
import {  Content } from 'antd/lib/layout/layout';
// component
import Frame from '../../shared/component/Frame1';
import DefaultLayout from '../../layout';


const Home = () => {
  return (
    <DefaultLayout>
      <Content>
        <Frame />
      </Content>
    </DefaultLayout>
  )
};

export default Home;
