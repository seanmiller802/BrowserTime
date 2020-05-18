import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import SettingsMenu from '../SettingsMenu/index';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const Header = () => {
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const classes = useStyles();

  const handleSettingsClick = (e) => {
    setPopoverAnchorEl(e.currentTarget);
  };

  const handleSettingsClose = () => {
    setPopoverAnchorEl(null);
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Browser Time
        </Typography>
        <div className={classes.grow} />
        <div>
          <Tooltip title="Settings" placement="bottom" arrow aria-label="settings">
            <IconButton onClick={handleSettingsClick} color="secondary">
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          <SettingsMenu
            open={Boolean(popoverAnchorEl)}
            anchorEl={popoverAnchorEl}
            handleClose={handleSettingsClose}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
