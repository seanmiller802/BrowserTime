import React, { useState, useContext } from 'react';
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
import { ThemeContext } from '../../context/ThemeContext';

const useStyles = makeStyles((theme) => ({
  appBar: (props) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: props.backgroundColor,
  }),
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const Header = () => {
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const currentTheme = useContext(ThemeContext);
  console.log('current theme', currentTheme);
  let props;
  if (currentTheme.palette.type === 'dark') {
    props = { backgroundColor: currentTheme.palette.background.default, color: 'white' };
  } else {
    props = { backgroundColor: currentTheme.palette.primary, color: 'white' };
  }
  const classes = useStyles(props);

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
