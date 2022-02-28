import React from 'react'
// styles
import { Pie } from '@ant-design/plots'
import "@ant-design/flowchart/dist/index.css"

interface IProps {
  data
  width?: number
  height?: number
  color?: string[]
}

const DonutChart = ({ data, width, height, color: colorIn }: IProps) => {
  const config = {
    appendPadding: 10,
    data,
    width: 246,
    height: 246,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.45,
    // startAngle: 90,
    // endAngle: -270,
    color: colorIn,
    legend: false,
    label: {
      type: 'inner',
      offset: '90%',
      autoRotate: false,
      content: '{value}',
      style: {
        textAlign: 'center',
        background: '#fff',
        width: '66px',
        height: '46px',
        padding: '12px',
        boxShadow: '0px 0px 50px rgba(50, 50, 71, 0.25)',
        borderRadius: '12px'
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
    statistic: undefined
  };
  return ( 
    <div className="donut-chart-inner">
      <Pie {...config} />;
    </div>
  )
}

export default React.memo(DonutChart)