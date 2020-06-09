import React from 'react';
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';

const TodaysTopCategory = ({ value }) => (
  <Card>
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        Today's top category
      </Typography>
      <Typography variant="h4" component="h2">
        {value}
      </Typography>
    </CardContent>
  </Card>
);

export default TodaysTopCategory;
