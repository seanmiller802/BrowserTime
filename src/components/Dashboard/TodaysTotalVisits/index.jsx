import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';

const TodaysTotalVisits = ({ value }) => {
  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Total page visits today
        </Typography>
        <Typography variant="h3" component="h2">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TodaysTotalVisits;
