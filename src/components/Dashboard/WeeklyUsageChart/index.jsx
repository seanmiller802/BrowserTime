import React from 'react';
import { Bar } from 'react-chartjs-2';

const WeeklyUsageChart = ({ data }) => (
  <Bar
    data={data}
    height={105}
    options={{
      responsive: true,
      scales: {
        yAxes: [
          {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10,
              beginAtZero: true,
            },
          },
        ],
        xAxes: [
          {
            gridLines: false,
          },
        ],
      },
    }}
  />
);

export default WeeklyUsageChart;
