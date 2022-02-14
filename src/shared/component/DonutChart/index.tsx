import React from 'react'
// styles
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface IProps {
  data
  color: string[]
}

const DonutChart = ({ data, color }: IProps) => {
  return (
    <ResponsiveContainer className="wrapper" width={246} height={246}>
    <PieChart className="pie__chart">
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        startAngle={-270}
        endAngle={90}
        innerRadius={50}
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
              className="pie__char-label"
              x={x}
              y={y}
              fill="#1E0D03"
              textAnchor={x > cx ? "start" : "end"}
              dominantBaseline="central"
            >
              {value}
            </text>
          );
        }}
      >
        {data.map((entry, index) => <Cell fill={color[index]} />)}
      </Pie>
    </PieChart>
  </ResponsiveContainer>
  )
}

export default React.memo(DonutChart)