import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const EstimatedTimeBrowsing = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography color="textPrimary" gutterBottom>
          Estimated time browsing
        </Typography>
        <Typography variant="h4" component="h2">
          4.5 hours
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EstimatedTimeBrowsing;
