import React from 'react'
import PropTypes from 'prop-types';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { randomColor, renderTime } from '/app/utils';

const METRIC_LABELS = {
  "cpu": "Percent",
  "memory": "Megabytes"
}

const TICK_FORMATTER = {
  "cpu": (val) => `${val}%`,
  "memory": (val) => `${val}mb`
}

const ECSMetricsChart = ({ data, lines, metric }) => {
  const yTickFormatter = TICK_FORMATTER[metric];
  const yLabel = METRIC_LABELS[metric];

  return (
    <ResponsiveContainer width='100%' height={400}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='time' tickFormatter={renderTime} />
        <YAxis label={{ value: yLabel, angle: -90, position: 'insideLeft' }} tickFormatter={yTickFormatter} />
        <Tooltip labelStyle={{ color: 'black' }} labelFormatter={renderTime} />
        <Legend />
        {
          lines.map((line, idx) => <Line type="monotone" key={line.dataKey} stroke={randomColor(idx)} {...line} />)
        }
      </LineChart>
    </ResponsiveContainer>
  )
}

ECSMetricsChart.propTypes = {
  data: PropTypes.array.isRequired,
  lines: PropTypes.arrayOf(PropTypes.shape({
    dataKey: PropTypes.string.isRequired
  })).isRequired,
  metric: PropTypes.oneOf(['cpu', 'memory']),
};

export default ECSMetricsChart;
