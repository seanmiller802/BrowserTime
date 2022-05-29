import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/styles';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  LinearProgress,
  Typography,
  Divider,
} from '@material-ui/core';
import Favicon from '../../Favicon';
import { formatTime } from '../../../lib/helpers/dashboard-helpers';

const Bar = withStyles((theme) => ({
  root: {
    height: 7,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: theme.palette.text.secondary,
  },
  bar: {
    borderRadius: 5,
    backgroundColor: theme.palette.text.primary,
  },
}))(LinearProgress);

const LinearProgressWithLabel = (props) => (
  <Box display="flex" alignItems="center">
    <Box width="100%" mr={1}>
      <Bar variant="determinate" {...props} />
    </Box>
    <Box minWidth={35}>
      <Typography variant="body2" color="textSecondary">{`${props.value}%`}</Typography>
    </Box>
  </Box>
);

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

const Site = ({ title, total, origin, percent }) => {
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Favicon url={origin} />
        </ListItemAvatar>
        <ListItemText primary={title} secondary={formatTime(total)} />
      </ListItem>
      <LinearProgressWithLabel value={percent} />
      <Divider />
    </>
  );
};

Site.propTypes = {
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  origin: PropTypes.string.isRequired,
  percent: PropTypes.number.isRequired,
};

const TopSites = ({ sites }) => {
  const sum = sites.reduce((a, b) => a + b.total, 0);
  return (
    <Card raised>
      <CardHeader
        title="Top Sites"
      />
      <CardContent>
        <List>
          {sites.map(({ title, total, origin }) => (
            <Site title={title} total={total} origin={origin} percent={Math.round((total / sum) * 100)} />
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default TopSites;
