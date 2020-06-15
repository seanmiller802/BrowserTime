/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import MomentUtils from '@date-io/moment';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import {
  Fade,
  Grid,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
} from '@material-ui/core';
import rangeMappings from '../../lib/mappings/rangeMappings';
import maxResultsMapping from '../../lib/mappings/maxResultsMapping';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: 0,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: 120,
  },
  datePicker: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const HistoryControls = ({
  range,
  customRange,
  handleUpdateCustomRange,
  handleUpdateRange,
  maxResults,
  setMaxResults,
}) => {
  const classes = useStyles();
  const { start, end } = customRange;
  const isCustomRange = range === 'Custom';

  // receives a moment date from the picker
  const handleStartChange = (date) => {
    handleUpdateCustomRange({ ...customRange, start: date._d });
  };

  // receives a moment date from the picker
  const handleEndChange = (date) => {
    handleUpdateCustomRange({ ...customRange, end: date._d });
  };

  const datePickers = isCustomRange ? (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="MM/D/yyyy"
        margin="none"
        id="date-picker-start"
        label="Start Date"
        size="small"
        value={start}
        onChange={handleStartChange}
        className={classes.datePicker}
        disableFuture
        inputVariant="filled"
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="MM/D/yyyy"
        margin="none"
        id="date-picker-end"
        label="End Date"
        size="small"
        value={end}
        onChange={handleEndChange}
        className={classes.datePicker}
        disableFuture
        inputVariant="filled"
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  ) : null;

  return (
    <Fade in enter exit appear timeout={500}>
      <Grid
        container
        justify={isCustomRange ? 'space-around' : 'flex-start'}
        alignItems="center"
        direction="row"
        style={{ margin: 'auto', maxWidth: 950 }}
      >
        <FormControl variant="filled" size="small" className={classes.formControl}>
          <InputLabel id="time-range-select-outlined-label">Time Range</InputLabel>
          <Select
            labelId="time-range-select-label"
            id="time-range-select"
            value={range}
            onChange={(e) => handleUpdateRange(e.target.value)}
            label="Time Range"
          >
            {rangeMappings.map((item) => (
              <MenuItem value={item.value}>
                {item.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {datePickers}
        <FormControl variant="filled" size="small" className={classes.formControl}>
          <InputLabel id="max-results-select-outlined-label">Max results</InputLabel>
          <Select
            labelId="max-results-select-label"
            id="max-results-select"
            value={maxResults}
            onChange={(e) => setMaxResults(e.target.value)}
            label="Max results"
          >
            {maxResultsMapping.map(({ value, text }) => (
              <MenuItem value={value}>
                {text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Fade>
  );
};

HistoryControls.propTypes = {
  range: PropTypes.oneOf([
    'Hour',
    'Today',
    'Yesterday',
    'Seven',
    'Fourteen',
    'Thirty',
    'Custom',
  ]),
  customRange: PropTypes.shape({
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
  }).isRequired,
  handleUpdateCustomRange: PropTypes.func.isRequired,
  handleUpdateRange: PropTypes.func.isRequired,
  maxResults: PropTypes.oneOf([
    10,
    100,
    1000,
    10000,
    50000,
    100000,
  ]).isRequired,
  setMaxResults: PropTypes.func.isRequired,
};

HistoryControls.defaultProps = {
  range: 'Today',
};

export default HistoryControls;
