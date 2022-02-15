import React, { useState } from 'react';
import {  Content } from 'antd/lib/layout/layout';
// datetime
import moment from 'moment'
// component
import DonutChart from '../../shared/component/DonutChart';
import ReactApexChart from 'react-apexcharts';     
// styles
import { Typography, Calendar, Button } from 'antd'
import { FiCalendar } from 'react-icons/fi'
import DatePicker from '../../shared/component/Calendar';

const { Title } = Typography

const data = [{ name: "network 1", value: 56024 }, { name: "network 3", value: 13568 }];
const COLORS = ['#4F75FF', '#FF8A48'];

const data2 = {
  series: [{
    name: 'series1',
    data: [31, 40, 28, 51, 42, 109, 100]
  }],
  options: {
    chart: {
      height: 350,
      type: 'area'
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN']
    },
  },
}
const Home = () => {
  const [ state, setState ] = useState(data2)
  console.log("render home")

  return (
    <Content className="home-component">
      <Title level={1} className="main-title">Thong ke</Title>
      <div className="chart">
        <div className="label">
          <h2>Doanh thu</h2>
        </div>
        <DatePicker />
        <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
       </div>
      <div className="revenue"> 
        <p>Tong doanh thu theo tuan</p>
        <h1>525.142.000 <span className="unit">dong</span></h1>
      </div>
      {/* <div className="chart2">
        <DatePicker />
        <DonutChart data={data} color={COLORS}/>
        <DonutChart data={data} color={COLORS}/>
      </div> */}
  </Content>
  )
};

export default Home;
