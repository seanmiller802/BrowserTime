import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { ThemeContext } from '../../../context/ThemeContext';

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.palette.primary.main,
    color: (props) => props.color,
  },
  copy: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
  },
}));

const PercentChange = ({ value }) => {
  const currentTheme = useContext(ThemeContext);
  const styleProps = ['DARK', 'NIGHT'].includes(currentTheme.name) ? { color: currentTheme.palette.text.primary } : { color: currentTheme.palette.background.default };
  const classes = useStyles(styleProps);
  const icon = value < 0 ? <ArrowUpward /> : <ArrowDownward />;
  const hasChange = value !== 'NA';
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography gutterBottom>
          Usage
        </Typography>
        {hasChange ? (
          <Typography variant="h4" component="h2" className={classes.copy}>
            {icon}
            {value}
            % this week
          </Typography>
        ) : (
          <Typography variant="h4" component="h2" className={classes.copy}>NA</Typography>
        )}
      </CardContent>
    </Card>
  );
};

PercentChange.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

export default PercentChange;
