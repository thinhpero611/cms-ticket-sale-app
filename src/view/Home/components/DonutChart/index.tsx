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
      offset: '100%',
      autoRotate: false,
      content: '{value}',
      style: {
        fontFamily: 'Montserrat',
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 20,
        textAlign: 'center',
        fill: '#1E0D03',
        shadowOffsetX: '66px',
        shadowOffsetY: '46px',
        shadowColor: 'black',
        boxShadow: '0px 0px 50px rgba(50, 50, 71, 0.25)',
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
      {/*@ts-ignore */}
      <Pie {...config} />
    </div>
  )
}

export default React.memo(DonutChart)