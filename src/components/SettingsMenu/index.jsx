import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Popover,
  Typography,
  TextField,
  MenuItem,
  InputAdornment,
} from '@material-ui/core';
import { THEMES } from '../../lib/constants';
import { SettingsContext } from '../../context/SettingsContext';

const useStyles = makeStyles((theme) => ({
  content: {
    width: 350,
    margin: '8px 16px',
  },
  themeSampleMain: {
    height: 20,
    width: 20,
    backgroundColor: theme.palette.background.dark,
  },
  themeSamplePrimary: {
    height: 20,
    width: 20,
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
  },
}));

const SettingsMenu = ({ open, handleClose, anchorEl }) => {
  const { settingsState, updateSettings } = useContext(SettingsContext);
  const classes = useStyles();

  const handleThemeChange = (e) => {
    console.log('rgjhdglj', e.target);
    updateSettings(e.target.name, e.target.value);
  };

  const id = open ? 'settings-popover' : undefined;

  const endAdornment = (
    <InputAdornment position="end" style={{ marginRight: 20 }}>
      <span className={classes.themeSamplePrimary} />
      <span className={classes.themeSampleMain} />
    </InputAdornment>
  );

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
          InputProps={{
            endAdornment,
          }}
        >
          {Object.keys(THEMES.free).map((theme) => (
            <MenuItem key={theme} value={theme}>
              {theme}
            </MenuItem>
          ))}
          {Object.keys(THEMES.premium).map((theme) => (
            <MenuItem key={theme} value={theme}>
              {`${theme} (Premium)`}
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
