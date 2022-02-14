import React from 'react';
import {  Content } from 'antd/lib/layout/layout';
// component
import Frame from '../../shared/component/Frame1';
import { Link } from 'react-router-dom';
// styles
import { Typography } from 'antd'
import { ResponsiveContainer, PieChart, Pie } from "recharts";
// import { Panel } from "react-bootstrap";

const { Title } = Typography
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


const data = [{ name: "network 1", value: 2 }, { name: "network 3", value: 4 }];

const Home = () => {
  console.log("render home")
  return (
    <Content>
      <Title level={1}>Thong ke</Title>
      {/* <Chart /> */}
      <Title level={5}>Tong doanh thu theo tuan</Title>
      <Title level={1}>525.142.000</Title><span>dong</span>
      {/* <PieChart /> */}

  <ResponsiveContainer width="100%" height={250}>
    <PieChart height={250}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={80}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
        label={({
          cx,
          cy,
          midAngle,
          innerRadius,
          outerRadius,
          value,
          index
        }) => {
          console.log("handling label?");
          const RADIAN = Math.PI / 180;
          // eslint-disable-next-line
          const radius = 25 + innerRadius + (outerRadius - innerRadius);
          // eslint-disable-next-line
          const x = cx + radius * Math.cos(-midAngle * RADIAN);
          // eslint-disable-next-line
          const y = cy + radius * Math.sin(-midAngle * RADIAN);

          return (
            <text
              x={x}
              y={y}
              fill="#8884d8"
              textAnchor={x > cx ? "start" : "end"}
              dominantBaseline="central"

            >
              {data[index].name} ({value})
            </text>
          );
        }}
      />
    </PieChart>
  </ResponsiveContainer>
  </Content>
  )
};

export default Home;
