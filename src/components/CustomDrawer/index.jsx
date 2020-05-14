import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Dashboard, History } from '@material-ui/icons';
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
} from '@material-ui/core';
import rangeMappings from '../../lib/rangeMappings';

const drawerWidth = 240;

const useStyles = makeStyles(() => ({
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
}));

const CustomDrawer = ({ handleUpdateRange, handleShowDashboard }) => {
  const [selectedItem, setSelectedItem] = useState(1);
  const classes = useStyles();

  const handleHistoryItemSelect = (item, index) => {
    console.log('CUSTOMDRAWER', item);
    setSelectedItem(index);
    handleUpdateRange(item.value);
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
          <ListItem button key="Dashboard" onClick={handleShowDashboard}>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListSubheader>History</ListSubheader>
          {rangeMappings.map((item, index) => (
            <ListItem
              button
              onClick={() => handleHistoryItemSelect(item, index)}
              key={item.value}
              selected={selectedItem === index}
            >
              {selectedItem === index && <ListItemIcon><History /></ListItemIcon>}
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <ListItem key="clear">
          <Button color="primary" variant="contained">
            Clear browsing data
          </Button>
        </ListItem>
      </div>
    </Drawer>
  );
};

CustomDrawer.propTypes = {
  handleUpdateRange: PropTypes.func.isRequired,
  handleShowDashboard: PropTypes.func.isRequired,
};

export default CustomDrawer;