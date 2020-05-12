import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Popover,
  Typography,
  TextField,
  MenuItem,
  makeStyles,
} from '@material-ui/core';
import { THEMES } from '../../lib/constants';
import { SettingsContext } from '../../context/SettingsContext';

const useStyles = makeStyles(() => ({
  content: {
    minWidth: '400px',
    margin: '8px 16px',
  },
}));

const SettingsMenu = ({ open, handleClose, anchorEl }) => {
  const { settingsState, updateSettings } = useContext(SettingsContext);
  const classes = useStyles();

  const handleThemeChange = (e) => {
    updateSettings(e.target.name, e.target.value);
  };

  const id = open ? 'settings-popover' : undefined;

  return (
    <Popover
      id={id}
      classes={classes.popover}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <div classes={classes.content}>
        <Typography variant="h4" align="left">Settings</Typography>
        <TextField
          id="theme-select"
          name="theme"
          select
          label="Theme"
          value={settingsState.theme}
          size="small"
          variant="outlined"
          fullWidth
          onChange={handleThemeChange}
        >
          {Object.keys(THEMES).map((theme) => (
            <MenuItem key={theme} value={theme}>
              {theme}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Popover>
  );
};

SettingsMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.shape({}),
};

SettingsMenu.defaultProps = {
  anchorEl: null,
};

export default SettingsMenu;
