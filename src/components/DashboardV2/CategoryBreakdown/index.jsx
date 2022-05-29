import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/styles';
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  Typography,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  LinearProgress,
} from '@material-ui/core';
import SportsFootballIcon from '@material-ui/icons/SportsFootball';
import MovieCreationIcon from '@material-ui/icons/MovieCreation';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ExplicitIcon from '@material-ui/icons/Explicit';
import SearchIcon from '@material-ui/icons/Search';
import PublicIcon from '@material-ui/icons/Public';
import { formatTime } from '../../../lib/helpers/dashboard-helpers';

const getIcon = (categoryKey) => {
  switch(categoryKey) {
    case 'News':
      return <PublicIcon />
    case 'Entertainment':
      return <MovieCreationIcon />
    case 'Sports':
      return <SportsFootballIcon />
    case 'Shopping':
      return <ShoppingCartIcon />
    case 'Adult':
      return <ExplicitIcon />
    case 'Social Networking':
      return <ThumbUpIcon />
    case 'Search Engines':
      return <SearchIcon />
    case 'Financial Services':
      return <AccountBalanceIcon />
    default:
      return 'O'
  }
}

const Bar = withStyles(() => ({
  root: {
    height: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  bar: {
    borderRadius: 5,
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

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.primary.main,
  }
}));

const Category = ({ title, time, percent }) => {
  const classes = useStyles();
  console.log('percent is', percent);
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar className={classes.avatar}>
            {getIcon(title)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={title} secondary={formatTime(time)} />
      </ListItem>
      <LinearProgressWithLabel value={percent} />
      <Divider />
    </>
  );
};

Category.propTypes = {
  title: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired,  
};

const CategoryBreakdown = ({ categories }) => {
  const total = categories.reduce((a, b) => a + b.time, 0);
  console.log('so totaali s', total);
  return (
    <Card raised>
      <CardHeader
        title="Category Breakdown"
      />
      <CardContent>
        <List>
          {categories.map(({ title, time }) => (
            <Category title={title} time={time} percent={Math.round((time / total) * 100)} />
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default CategoryBreakdown;
