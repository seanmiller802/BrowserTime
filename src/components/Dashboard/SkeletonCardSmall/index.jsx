import React from 'react';
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const SkeletonCardSmall = () => (
  <Card>
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        <Skeleton animation="wave" height={30} style={{ marginBottom: 6 }} />
      </Typography>
      <Typography variant="h4" component="h2">
        <Skeleton animation="wave" height={30} style={{ marginBottom: 6 }} />
      </Typography>
    </CardContent>
  </Card>
);

export default SkeletonCardSmall;
