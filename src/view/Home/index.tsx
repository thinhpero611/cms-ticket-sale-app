import React from 'react';
import {  Content } from 'antd/lib/layout/layout';
// component
import Frame from '../../shared/component/Frame1';
import { Link } from 'react-router-dom';


const Home = () => {
  console.log("render home")
  return (
    <Content>
      <Link to="/setting">link to setting</Link>
      <Frame />
    </Content>
  )
};

export default Home;
