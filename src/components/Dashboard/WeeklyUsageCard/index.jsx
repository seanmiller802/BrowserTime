import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core';
import CategoryChart from '../CategoryChart';
import TimeChart from '../TimeChart';

const components = {
  category: CategoryChart,
  time: TimeChart,
};

const WeeklyUsageCard = ({ data, chartType, title }) => {
  const SpecificChart = components[chartType];
  return (
    <Card raised="true">
      <CardHeader
        title={data.length < 1 ? 'Last 7 days unavailable' : title}
      />
      <CardContent>
        <SpecificChart history={data} />
      </CardContent>
    </Card>
  );
};

WeeklyUsageCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  chartType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default WeeklyUsageCard;
