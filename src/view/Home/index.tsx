import React, { useState, useEffect } from 'react';
import {  Content } from 'antd/lib/layout/layout';
// component
import DonutChart from './components/DonutChart';
import { Area } from '@ant-design/plots';       
import DatePicker from './components/Calendar';
// styles
import { Typography} from 'antd'
import { useDispatch } from 'react-redux';

const { Title } = Typography

// initial data
const data2 = [{ type: "network 1", value: 28302 }, { type: "network 3", value: 30256}]
const data1 = [{ type: "network 1", value: 13568 }, { type: "network 3", value: 56024 }];
const COLORS = ['#FF8A48', '#4F75FF'];

const Home = () => {
  const [ data, setData ] = useState([])
  const dispatch = useDispatch()

  // get data from fireabse
  useEffect(() => {
    asyncFetch();
  }, [dispatch])

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  // area chart configs
  const config = {
    data,
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      range: [0, 1],
      tickCount: 5,
    },
    smooth: true,
    line: {
      color: '#FF993C',
      size: 4
    },
    areaStyle: () => {
      return {
        fill: 'l(270) 0:#ffffff 0.74:#FAA05f 1:#FF993C',
      };
    },
  };
  console.log("render home")

  return (
    <Content className="home-component">
      
      <Title level={1} className="main-title">Thống kê</Title>
      <div className="chart">
        <div className="label">
          <h2>Doanh thu</h2>
        </div>
        <DatePicker />
        <Area {...config} />
       </div>
      <div className="revenue"> 
        <p>Tổng doanh thu theo tuần</p>
        <h1>525.142.000 </h1><span className="currency">đồng</span>
      </div>
      <div className="chart2">
        <DatePicker />
        <div className="donut-chart">
          <h2>Gói Gia đình</h2>
          <DonutChart data={data1} color={COLORS} />
        </div>
        <div className="donut-chart">
          <h2>Gói sự kiện</h2>
          <DonutChart data={data2} color={COLORS} />
        </div>
        <div className="legend">
          <div className="item-legend">
            <div className="rectangle"></div>
            <h2>Vé đã sử dụng</h2>
          </div>
          <div className="item-legend">
            <div className="rectangle"></div>
            <h2>Vé chưa sử dụng</h2>
          </div>
        </div>
      </div>
  </Content>
  )
};

export default Home;
