import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Button,
  InputBase,
  IconButton,
  Divider,
  Tooltip,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import FilterListIcon from '@material-ui/icons/FilterList';
import WhatsHotIcon from '@material-ui/icons/Whatshot';

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

function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay], // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}

const HistorySearch = ({
  autoFocus,
  placeholder,
  value,
  onChange,
  showControls,
  handleShowControls,
  handleDeleteAll,
}) => {
  const classes = useStyles();

  const debouncedSearchTerm = useDebounce(value, 3000);

  useEffect(() => {
    if (debouncedSearchTerm) {
      onChange(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const handleSearchChange = (text) => {
    onChange(text);
  };

  return (
    <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} disableRipple aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        autoFocus={autoFocus}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleSearchChange(e.target.value)}
        fullWidth
        className={classes.inputBase}
        inputProps={{ 'aria-label': 'search' }}
      />
      {value.length > 0 && (
        <IconButton className={classes.iconButton} onClick={() => handleSearchChange('')} aria-label="clear">
          <CancelIcon />
        </IconButton>
      )}
      <Divider className={classes.divider} orientation="vertical" />
      {
        showControls ? (
          <Button onClick={handleShowControls}>hide filters</Button>
        ) : (
          <Tooltip title="show filters" placement="bottom" arrow aria-label="filter">
            <IconButton color="primary" className={classes.iconButton} onClick={handleShowControls} aria-label="directions">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )
      }
      <Divider className={classes.divider} orientation="vertical" />
      <Tooltip title="delete all history" placement="bottom" arrow aria-label="delete">
        <IconButton color="primary" className={classes.iconButton} onClick={handleDeleteAll} aria-label="directions">
          <WhatsHotIcon />
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

HistorySearch.propTypes = {
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  showControls: PropTypes.bool.isRequired,
  handleShowControls: PropTypes.func.isRequired,
  handleDeleteAll: PropTypes.func.isRequired,
};

HistorySearch.defaultProps = {
  autoFocus: true,
  placeholder: 'Search',
};

export default HistorySearch;
