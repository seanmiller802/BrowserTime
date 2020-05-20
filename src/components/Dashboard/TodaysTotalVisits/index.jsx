import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';

const TodaysTotalVisits = ({ getTotalPageVisits }) => {
  const [totals, setTotals] = useState({});

  useEffect(() => {
    const totalVisits = getTotalPageVisits();
    setTotals(totalVisits);
  });

  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Total page visits today
        </Typography>
        <Typography variant="h5" component="h2">
          {totals.today}
        </Typography>
      </CardContent>
    </Card>
  );
};

TodaysTotalVisits.propTypes = {
  getTotalPageVisits: PropTypes.func.isRequired,
};

export default TodaysTotalVisits;
