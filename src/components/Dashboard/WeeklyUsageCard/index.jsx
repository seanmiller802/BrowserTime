import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core';
import WeeklyUsageChart from '../WeeklyUsageChart';

const WeeklyUsageCard = ({ history }) => (
  <Card raised="true">
    <CardHeader
      title={history.length < 1 ? 'Last 7 days unavailable' : 'Last 7 days'}
    />
    <CardContent>
      <WeeklyUsageChart history={history} />
    </CardContent>
  </Card>
);

WeeklyUsageCard.propTypes = {
  history: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default WeeklyUsageCard;
