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

console.log("THEMES bruh", THEMES);

const useStyles = makeStyles(() => ({
  content: {
    width: 350,
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
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <div className={classes.content}>
        <Typography variant="h4" align="left">Settings</Typography>
        <TextField
          id="theme-select"
          name="theme"
          select
          label="Theme"
          value={settingsState.theme}
          size="small"
          variant="outlined"
          margin="normal"
          fullWidth
          onChange={handleThemeChange}
        >
          {Object.keys(THEMES.free).map((theme) => (
            <MenuItem key={theme} value={theme}>
              {theme}
            </MenuItem>
          ))}
          {Object.keys(THEMES.premium).map((theme) => (
            <MenuItem key={theme} value={theme}>
              {`${theme} (premium)`}
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
