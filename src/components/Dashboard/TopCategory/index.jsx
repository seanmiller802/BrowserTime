import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import categoryMappings from '../../../lib/mappings/categoryMappings';

const useStyles = makeStyles(() => ({
  category: {
    backgroundColor: ({ color }) => color,
    padding: '2px 5px',
    borderRadius: '2px',
  },
}));

const TopCategory = ({ value }) => {
  const bgColor = categoryMappings.find((item) => item.name === value).color;
  const classes = useStyles({ color: bgColor });
  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Top category
        </Typography>
        <Typography variant="h4" component="span" className={classes.category}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

TopCategory.propTypes = {
  value: PropTypes.string.isRequired,
};


export default TopCategory;
