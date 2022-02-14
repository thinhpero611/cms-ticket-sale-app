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

const { Title } = Typography

const data = [{ name: "network 1", value: 56024 }, { name: "network 3", value: 13568 }];
const COLORS = ['#4F75FF', '#FF8A48'];

const data2 = {
  series: [{
    name: 'series1',
    data: [31, 40, 28, 51, 42, 109, 100]
  }, {
    name: 'series2',
    data: [11, 32, 45, 32, 34, 52, 41]
  }],
  options: {
    chart: {
      height: 350,
      type: 'area'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    },
  },
}
const Home = () => {
  const [ isShowCalendar, setIsShowCalendar ] = useState(false)
  console.log("render home")
  const hanldeShowCalendar = () => {
    setIsShowCalendar(true)
  }
  const onPannelChange = (value, mode) => {
    console.log(value, mode)
  }

  return (
    <Content className="home-component">
      <Title level={1} className="main-title">Thong ke</Title>
      <div className="chart">
        <div className="label">
          <h2>Doanh thu</h2>
        </div>
        <div className="calendar">
          <p className="date-now">{moment.now}</p>
          {isShowCalendar ? 
          <Calendar fullscreen={false} onPanelChange={onPannelChange} /> : ""}
          <Button onClick={hanldeShowCalendar} >
            <FiCalendar className="icon__calendar" />
          </Button>
        </div>
        {/* <ReactApexChart options={data2.options} series={data2?.series} type="area" height={350} /> */}
       </div>
      <div className="revenue"> 
        <Title level={5}>Tong doanh thu theo tuan</Title>
        <Title level={1}>525.142.000 <span className="unit">dong</span></Title>
      </div>
      <div className="chart2">
        <DonutChart data={data} color={COLORS}/>
        <DonutChart data={data} color={COLORS}/>
      </div>
  </Content>
  )
};

export default Home;
