import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@material-ui/core';
import { formatTime } from '../../../lib/helpers/dashboard-helpers';

const TotalTime = ({ total }) => (
  <Card raised>
    <CardHeader
      title="Total Time"
    />
    <CardContent>
      <Typography variant="h3">
        {/* {String.fromCodePoint('&#x23F1')} */}
        {formatTime(total)}
      </Typography>
    </CardContent>
  </Card>
);

TotalTime.propTypes = {
  total: PropTypes.number.isRequired,
};

export default TotalTime;
