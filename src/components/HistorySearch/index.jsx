import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  InputBase,
  IconButton,
  Divider,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 600,
  },
  iconButton: {
    padding: 10,
  },
  cancelIcon: {
    marginRight: theme.spacing(1),
    '&:hover': {
      cursor: 'pointer',
    },
  },
  inputBase: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const HistorySearch = ({
  autoFocus,
  placeholder,
  value,
  onChange,
  handleShowControls,
}) => {
  const classes = useStyles();
  return (
    <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} disableRipple aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        autoFocus={autoFocus}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
        className={classes.inputBase}
        inputProps={{ 'aria-label': 'search' }}
      />
      {value.length > 0 && (
        <IconButton className={classes.iconButton} onClick={() => onChange('')} aria-label="clear">
          <CancelIcon />
        </IconButton>
      )}
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton color="primary" className={classes.iconButton} onClick={handleShowControls} aria-label="directions">
        <FilterListIcon />
      </IconButton>
    </Paper>
  );
};

HistorySearch.propTypes = {
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  handleShowControls: PropTypes.func.isRequired,
};

HistorySearch.defaultProps = {
  autoFocus: true,
  placeholder: 'Search',
};

export default HistorySearch;
