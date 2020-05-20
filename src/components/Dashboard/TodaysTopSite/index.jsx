import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const TodaysTopSite = ({ isLoading }) => {
  return isLoading ? (
    <Skeleton variant="rect" width={210} height={118} />
  ) : (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Today's top site
        </Typography>
        <Typography variant="h4" component="h2">
          Youtube
        </Typography>
      </CardContent>
    </Card>
  );
};

TodaysTopSite.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default TodaysTopSite;
