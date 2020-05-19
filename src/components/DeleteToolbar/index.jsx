import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
  deleteToolbar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  grow: {
    flexGrow: 1,
  },
  text: {
    marginRight: theme.spacing(4),
  },
  iconButton: {
    marginRight: theme.spacing(2),
  },
  button: {
    marginLeft: theme.spacing(2),
  },
}));

const DeleteToolbar = ({ count, cancel, deleteItems }) => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.deleteToolbar}>
      <Toolbar>
        <div className={classes.grow} />
        <IconButton className={classes.iconButton} onClick={cancel} aria-label="clear">
          <CancelIcon />
        </IconButton>
        <Typography variant="h5" className={classes.text}>{`Delete ${count} items?`}</Typography>
        <Button variant="outlined" className={classes.button} onClick={cancel}>Cancel</Button>
        <Button variant="contained" className={classes.button} onClick={deleteItems}>Delete</Button>
        <div className={classes.grow} />
      </Toolbar>
    </AppBar>
  );
};

DeleteToolbar.propTypes = {
  count: PropTypes.number.isRequired,
  cancel: PropTypes.func.isRequired,
  deleteItems: PropTypes.func.isRequired,
};

export default DeleteToolbar;
