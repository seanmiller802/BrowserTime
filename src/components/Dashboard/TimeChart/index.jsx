import React from 'react';
import PropTypes from 'prop-types';
import {
  Chart,
  BarSeries,
  ValueAxis,
  ArgumentAxis,
} from '@devexpress/dx-react-chart-material-ui';
import {
  Animation,
} from '@devexpress/dx-react-chart';
import hourMappings from '../../../lib/mappings/hourMappings';

const Label = () => (props) => {
  const { text } = props;
  return (
    <ValueAxis.Label
      {...props}
      text={text}
    />
  );
};

const TimeChart = ({ history }) => {
  const HourLabel = Label();

  const maxCount = Math.max(...history.map((hour) => hour.count), null);

  const getCount = (hour) => history.find((a) => a.hour === hour);

  const getChartData = () => {
    const labels = hourMappings.map((item) => item.val);
    const historyHours = [];
    history.forEach((item) => {
      historyHours.push(item.hour);
    });
    const data = [];
    let i = 0;
    let y = 0;
    while (i < labels.length) {
      if (labels[i] === historyHours[y]) {
        const { count } = getCount(historyHours[y]);
        data.push({
          hour: historyHours[y],
          count,
        });
        y += 1;
      } else {
        data.push({
          hour: labels[i],
          count: 0,
        });
      }
      i += 1;
    }
    return data;
  };

  return (
    <Chart
      data={getChartData()}
    >
      <ArgumentAxis />
      <ValueAxis max={maxCount} labelComponent={HourLabel} />
      <BarSeries
        valueField="count"
        argumentField="hour"
      />
      <Animation />
    </Chart>
  );
};

TimeChart.propTypes = {
  history: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default TimeChart;
