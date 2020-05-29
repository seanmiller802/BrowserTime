import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';

const TodaysTotalVisits = ({ totalVisits }) => {
  const { total, change } = totalVisits;

  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Total page visits today
        </Typography>
        <Typography variant="h3" component="h2">
          {total || 'Not enough history'}
        </Typography>
        {change && <span>{change}</span>}
      </CardContent>
    </Card>
  );
};

TodaysTotalVisits.propTypes = {
  totalVisits: PropTypes.shape({
    total: PropTypes.number,
    change: PropTypes.number,
  }),
};

TodaysTotalVisits.defaultProps = {
  totalVisits: {
    total: null,
    change: null,
  },
};

export default TodaysTotalVisits;
