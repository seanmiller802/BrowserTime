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
              maxTicksLimit: 100,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
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
