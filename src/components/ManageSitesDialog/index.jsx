import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Slide,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  List,
  ListItem,
  ListSubheader,
  Typography,
  Paper,
  InputBase,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    paddingBottom: theme.spacing(4),
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 450,
    margin: 'auto',
  },
  inputBase: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  itemText: {
    marginLeft: theme.spacing(1),
  },
}));

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const ManageSitesDialog = ({
  open,
  items,
  cancel,
  addItem,
  removeItem,
}) => {
  const classes = useStyles();
  const [site, setSite] = useState('');
  const disabled = site.length < 1;

  const handleAddItem = () => {
    addItem(site);
    setSite('');
  };

  return (
    <Dialog
      open={open}
      onBackdropClick={cancel}
      onEscapeKeyDown={cancel}
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">Manage blocked sites</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Paper component="form" className={classes.root}>
          <InputBase
            name="site"
            autoFocus
            placeholder="Add a new site"
            value={site}
            onChange={(e) => setSite(e.target.value)}
            className={classes.inputBase}
            inputProps={{ 'aria-label': 'search' }}
          />
          {site.length > 0 && (
            <IconButton className={classes.iconButton} onClick={() => setSite('')} aria-label="clear">
              <CancelIcon />
            </IconButton>
          )}
        </Paper>
        <List dense>
          <ListSubheader>
            {items.length > 0 ? 'Block access to the following sites' : 'No blocked sites added yet'}
          </ListSubheader>
          {items.map((item, index) => (
            <ListItem>
              <Tooltip title="remove blocked site" placement="left" arrow>
                <RemoveCircleIcon
                  fontSize="small"
                  onClick={() => removeItem(item, index)}
                />
              </Tooltip>
              <Typography variant="body1" className={classes.itemText}>{item}</Typography>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancel}>
          Cancel
        </Button>
        <Button onClick={handleAddItem} disabled={disabled} variant="contained" color="primary">
          Add item
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ManageSitesDialog.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  open: PropTypes.bool.isRequired,
  cancel: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default ManageSitesDialog;
