import React, { useState } from 'react';
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

const CustomDrawer = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const classes = useStyles();
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
          <ListItem button key="Dashboard">
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListSubheader>Subheader</ListSubheader>
          {['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'].map((text, index) => (
            <ListItem
              button
              onClick={() => setSelectedItem(index)}
              key={text}
              selected={selectedItem === index}
            >
              {selectedItem === index && <ListItemIcon><History /></ListItemIcon>}
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <ListItem key="clear">
          <Button color="primary" variant="contained">
            Do something
          </Button>
        </ListItem>
      </div>
    </Drawer>
  );
};

export default CustomDrawer;
