import React, { useContext } from 'react';
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
import { ThemeContext } from '../../context/ThemeContext';

const useStyles = makeStyles((theme) => ({
  deleteToolbar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  grow: {
    flexGrow: 1,
  },
  text: {
    marginRight: theme.spacing(4),
    color: (props) => props.color,
  },
  iconButton: {
    marginRight: theme.spacing(2),
    color: (props) => props.color,
  },
  cancelButton: {
    marginLeft: theme.spacing(2),
    borderColor: (props) => props.color,
    color: (props) => props.color,
  },
  deleteButton: {
    marginLeft: theme.spacing(2),
    backgroundColor: (props) => props.deleteBackground,
    color: (props) => props.deleteColor,
  },
}));

const DeleteToolbar = ({ count, cancel, deleteItems }) => {
  const currentTheme = useContext(ThemeContext);
  const styleProps = {
    color: ['DARK', 'NIGHT'].includes(currentTheme.name) ? '#ffffff' : currentTheme.palette.background.dark,
    deleteBackground: ['NINJA'].includes(currentTheme.name) ? '#000000' : '#ffffff',
    deleteColor: ['NINJA'].includes(currentTheme.name) ? '#ffffff' : '#000000',
  };
  const classes = useStyles(styleProps);

  return (
    <AppBar position="fixed" className={classes.deleteToolbar}>
      <Toolbar>
        <div className={classes.grow} />
        <IconButton className={classes.iconButton} onClick={cancel} aria-label="clear">
          <CancelIcon />
        </IconButton>
        <Typography variant="h5" className={classes.text}>{`Delete ${count} ${count > 1 ? 'items' : 'item'}?`}</Typography>
        <Button variant="outlined" className={classes.cancelButton} onClick={cancel}>Cancel</Button>
        <Button variant="contained" className={classes.deleteButton} onClick={deleteItems}>Delete</Button>
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
