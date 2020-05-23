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
import ManageKeywordsDialog from '../ManageKeywordsDialog';
import ManageSitesDialog from '../ManageSitesDialog';

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
  const [showManageKeywords, setShowManageKeywords] = useState(false);
  const [showManageSites, setShowManageSites] = useState(false);
  const { settingsState, updateSettings } = useContext(SettingsContext);
  const {
    accountType,
    theme,
    showResultsCount,
    turnOffHistory,
    enableAutoRemoveKeywords,
    autoRemoveKeywordsList,
    enableBlockedSites,
    blockedSitesList,
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

  const handleEnableAutoRemoveKeywords = (e) => {
    updateSettings(e.target.name, !enableAutoRemoveKeywords);
  };

  const handleEnableBlockedSites = (e) => {
    updateSettings(e.target.name, !enableBlockedSites);
  };

  const handleAddKeyword = (keyword) => {
    updateSettings('autoRemoveSitesList', [...autoRemoveKeywordsList, keyword]);
  };

  const handleRemoveKeyword = (keyword, index) => {
    const updated = Array.apply([], autoRemoveKeywordsList);
    updated.splice(index, 1);
    updateSettings('autoRemoveSitesList', updated);
  };

  const handleAddBlockedSite = (site) => {
    updateSettings('blockedSitesList', [...blockedSitesList, site]);
  };

  const handleRemoveBlockedSite = (site, index) => {
    const updated = Array.apply([], blockedSitesList);
    updated.splice(index, 1);
    updateSettings('blockedSitesList', updated);
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
                  control={<Switch disabled={enableAutoRemoveKeywords || enableBlockedSites} checked={turnOffHistory} onChange={handleTurnOffHistory} name="turnOffHistory" />}
                  label="Turn off all history"
                />
                {turnOffHistory && (
                  <Typography variant="caption">
                    Stops all history from being recorded
                  </Typography>
                )}
                <FormControlLabel
                  control={<Switch disabled={turnOffHistory} checked={enableAutoRemoveKeywords} onChange={handleEnableAutoRemoveKeywords} name="enableAutoRemoveKeywords" />}
                  label="Enable auto-remove keywords"
                />
                {enableAutoRemoveKeywords && (
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
                        onClick={() => setShowManageKeywords(true)}
                      >
                        Manage Keywords
                      </Button>
                    </div>
                  </>
                )}
                <FormControlLabel
                  control={<Switch disabled={turnOffHistory} checked={enableBlockedSites} onChange={handleEnableBlockedSites} name="enableBlockedSites" />}
                  label="Enable blocked sites"
                />
                {enableBlockedSites && (
                  <>
                    <Typography variant="caption">
                      Enabling this features allows you to automagically
                      block your browser for opening certain websites
                    </Typography>
                    <div style={{ marginTop: 10 }}>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => setShowManageSites(true)}
                      >
                        Manage Blocked Sites
                      </Button>
                    </div>
                  </>
                )}
              </FormGroup>
            </FormControl>
          </div>
        </div>
      </Popover>
      <ManageKeywordsDialog
        open={showManageKeywords}
        items={autoRemoveKeywordsList}
        cancel={() => setShowManageKeywords(false)}
        addItem={handleAddKeyword}
        removeItem={handleRemoveKeyword}
      />
      <ManageSitesDialog
        open={showManageSites}
        items={blockedSitesList}
        cancel={() => setShowManageSites(false)}
        addItem={handleAddBlockedSite}
        removeItem={handleRemoveBlockedSite}
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
