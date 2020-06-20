import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.palette.primary.main,
  },
  copy: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
  },
}));

const PercentChange = ({ value }) => {
  const classes = useStyles();
  const icon = value < 0 ? <ArrowUpward /> : <ArrowDownward />;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography color="textPrimary" gutterBottom>
          Usage
        </Typography>
        <Typography variant="h4" component="h2" className={classes.copy}>
          {icon}
          {value}
          % this week
        </Typography>
      </CardContent>
    </Card>
  );
};

PercentChange.propTypes = {
  value: PropTypes.number.isRequired,
};

export default PercentChange;
