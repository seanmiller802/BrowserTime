import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { HourglassFull, History, Launch } from '@material-ui/icons';
import {
  Toolbar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListSubheader,
  ListItemText,
  ListItemIcon,
  Button,
  Typography,
} from '@material-ui/core';
import rangeMappings from '../../lib/rangeMappings';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  dashboard: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  version: {
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: theme.spacing(2),
  },
}));

const CustomDrawer = ({
  range,
  handleUpdateRange,
  handleShowDashboard,
}) => {
  const classes = useStyles();

  // THIS IS BROKEN
  const openBrowserSettings = () => {
    chrome.tabs.create({ url: 'http://chrome://settings/clearBrowserData' });
    // window.open('https://chrome://settings/clearBrowserData', '_blank');
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          <ListSubheader>
            Insights
          </ListSubheader>
          <ListItem button alignItems="center" key="Dashboard" onClick={handleShowDashboard} className={classes.dashboard}>
            <ListItemIcon>
              <HourglassFull />
            </ListItemIcon>
            <ListItemText primary="Browser Time" />
          </ListItem>
          <ListSubheader>History</ListSubheader>
          {rangeMappings.map((item) => (
            <ListItem
              button
              onClick={() => handleUpdateRange(item.value)}
              key={item.value}
              selected={item.value === range}
            >
              {item.value === range && <ListItemIcon><History /></ListItemIcon>}
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <ListItem key="clear" onClick={openBrowserSettings}>
          <Button endIcon={<Launch />}>
            Clear browsing data
          </Button>
        </ListItem>
      </div>
      <div className={classes.version}>
        <Typography variant="caption">{`v${process.env.npm_package_version}`}</Typography>
      </div>
    </Drawer>
  );
};

CustomDrawer.propTypes = {
  range: PropTypes.string.isRequired,
  handleUpdateRange: PropTypes.func.isRequired,
  handleShowDashboard: PropTypes.func.isRequired,
};

export default CustomDrawer;
