import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';

const TotalUniqueSites = ({ value }) => (
  <Card>
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        Unique sites visited
      </Typography>
      <Typography variant="h4" component="h2">
        {value}
      </Typography>
    </CardContent>
  </Card>
);

TotalUniqueSites.propTypes = {
  value: PropTypes.string.isRequired,
};

export default TotalUniqueSites;
