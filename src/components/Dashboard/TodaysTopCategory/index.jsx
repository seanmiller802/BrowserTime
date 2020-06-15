import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';

const TodaysTopCategory = ({ value }) => (
  <Card>
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        Today&#39;s top category
      </Typography>
      <Typography variant="h4" component="h2">
        {value}
      </Typography>
    </CardContent>
  </Card>
);

TodaysTopCategory.propTypes = {
  value: PropTypes.string.isRequired,
};


export default TodaysTopCategory;
