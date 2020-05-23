import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/styles';
import {
  Popover,
  Typography,
  IconButton,
  Button,
  Divider,
  Paper,
  InputBase,
  Select,
  MenuItem,
  ListSubheader,
  ListItemText,
  Switch,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
} from '@material-ui/core';
import { THEMES } from '../../lib/constants';
import { SettingsContext } from '../../context/SettingsContext';
import ManageItemsDialog from '../ManageItemsDialog';

const CustomInput = withStyles((theme) => ({
  input: {
    width: 210,
    padding: '5px 10px',
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: 'none',
    fontSize: 16,
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  content: {
    width: 350,
    margin: '8px 16px',
  },
  settings: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    marginTop: theme.spacing(2),
  },
  formLabel: {
    marginBottom: theme.spacing(2),
  },
  root: {
    maringBottom: 10,
    padding: '2px 8px',
    display: 'flex',
    alignItems: 'center',
  },
  accountType: {
    padding: '10px 8px',
    marginBottom: theme.spacing(2),
  },
  upgradeBtn: {
    marginLeft: theme.spacing(2),
  },
  iconButton: {
    '&:hover': {
      background: 'none',
    },
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
  divider: {
    height: 28,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  sites: {
    marginTop: theme.spacing(2),
  },
}));

const SettingsMenu = ({ open, handleClose, anchorEl }) => {
  const [showManageItems, setShowManageItems] = useState(false);
  const { settingsState, updateSettings } = useContext(SettingsContext);
  const {
    accountType,
    theme,
    showResultsCount,
    turnOffHistory,
    enableAutoRemoveSites,
    autoRemoveSitesList,
  } = settingsState;
  const classes = useStyles();

  const handleThemeChange = (e) => {
    updateSettings(e.target.name, e.target.value);
  };

  const handleShowResultsCount = (e) => {
    updateSettings(e.target.name, !showResultsCount);
  };

  const handleTurnOffHistory = (e) => {
    updateSettings(e.target.name, !turnOffHistory);
  };

  const handleEnableAutoRemoveSites = (e) => {
    updateSettings(e.target.name, !enableAutoRemoveSites);
  };

  const handleAddItem = (item) => {
    updateSettings('autoRemoveSitesList', [...autoRemoveSitesList, item]);
  };

  const handleRemoveItem = (item, index) => {
    const updated = Array.apply([], autoRemoveSitesList);
    updated.splice(index, 1);
    updateSettings('autoRemoveSitesList', updated);
  };

  const id = open ? 'settings-popover' : undefined;

  return (
    <>
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
          <div className={classes.settings}>
            <FormLabel component="legend" className={classes.formLabel}>Account Type</FormLabel>
            <Paper component="form" className={`${classes.root} ${classes.accountType}`}>
              <Typography variant="h5">{accountType}</Typography>
              <Button variant="outlined" size="small" className={classes.upgradeBtn}>Upgrade to Pro</Button>
            </Paper>
            <FormLabel component="legend" className={classes.formLabel}>Theme</FormLabel>
            <Paper component="form" className={classes.root}>
              <IconButton className={classes.iconButton} disableRipple disableFocusRipple size="small" aria-label="search">
                <span className={classes.themeSamplePrimary} />
                <span className={classes.themeSampleMain} />
              </IconButton>
              <Divider className={classes.divider} orientation="vertical" />
              <Select
                name="theme"
                labelId="settings-select-label"
                id="settings-select"
                value={theme}
                onChange={handleThemeChange}
                input={<CustomInput />}
              >
                <ListSubheader>Basic</ListSubheader>
                {Object.keys(THEMES.free).map((t) => (
                  <MenuItem key={t} value={t}>
                    <ListItemText primary={t} />
                  </MenuItem>
                ))}
                <ListSubheader color="primary">Premium themes</ListSubheader>
                {Object.keys(THEMES.premium).map((t) => (
                  <MenuItem key={t} value={t}>
                    <ListItemText primary={t} />
                  </MenuItem>
                ))}
              </Select>
            </Paper>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend" className={classes.formLabel}>History</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Switch checked={showResultsCount} onChange={handleShowResultsCount} name="showResultsCount" />}
                  label="Show results count"
                />
                <FormControlLabel
                  control={<Switch disabled={enableAutoRemoveSites} checked={turnOffHistory} onChange={handleTurnOffHistory} name="turnOffHistory" />}
                  label="Turn off all history"
                />
                {turnOffHistory && (
                  <Typography variant="caption">
                    Stops all history from being recorded
                  </Typography>
                )}
                <FormControlLabel
                  control={<Switch disabled={turnOffHistory} checked={enableAutoRemoveSites} onChange={handleEnableAutoRemoveSites} name="enableAutoRemoveSites" />}
                  label="Enable auto-remove keywords"
                />
                {enableAutoRemoveSites && (
                  <>
                    <Typography variant="caption">
                      Enabling this features allows you to automagically stop recording history
                      items that match your specified keywords
                    </Typography>
                    <div style={{ marginTop: 10 }}>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => setShowManageItems(true)}
                      >
                        Manage Keywords
                      </Button>
                    </div>
                  </>
                )}
              </FormGroup>
            </FormControl>
          </div>
        </div>
      </Popover>
      <ManageItemsDialog
        open={showManageItems}
        items={settingsState.autoRemoveSitesList}
        cancel={() => setShowManageItems(false)}
        addItem={handleAddItem}
        removeItem={handleRemoveItem}
      />
    </>
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
