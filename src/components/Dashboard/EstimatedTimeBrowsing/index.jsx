import React from 'react';
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';

const EstimatedTimeBrowsing = () => (
  <Card>
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        Estimated time browsing
      </Typography>
      <Typography variant="h5" component="h2">
        4.5 hours
      </Typography>
    </CardContent>
  </Card>
);

export default EstimatedTimeBrowsing;
