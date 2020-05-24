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

const ManageItemsDialog = ({
  open,
  items,
  cancel,
  addItem,
  removeItem,
  title,
  inputPlaceholder,
  tooltipTitle,
  subheader,
}) => {
  const classes = useStyles();
  const [currentValue, setCurrentValue] = useState('');
  const addItemDisabled = currentValue.length < 1;

  const handleAddItem = () => {
    addItem(currentValue);
    setCurrentValue('');
  };

  return (
    <Dialog
      open={open}
      onBackdropClick={cancel}
      onEscapeKeyDown={cancel}
      TransitionComponent={Transition}
      aria-labelledby="manage-items-dialog-title"
      aria-describedby="manage-items-dialog-subheader"
    >
      <DialogTitle id="manage-items-dialog-title">{title}</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Paper component="form" className={classes.root}>
          <InputBase
            name="keyword"
            autoFocus
            placeholder={inputPlaceholder}
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            className={classes.inputBase}
            inputProps={{ 'aria-label': 'add' }}
          />
          {currentValue.length > 0 && (
            <IconButton className={classes.iconButton} onClick={() => setCurrentValue('')} aria-label="clear">
              <CancelIcon />
            </IconButton>
          )}
        </Paper>
        <List dense>
          <ListSubheader id="manage-items-dialog-subheader">
            {subheader}
          </ListSubheader>
          {items.map((item, index) => (
            <ListItem>
              <Tooltip title={tooltipTitle} placement="left" arrow>
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
        <Button onClick={handleAddItem} disabled={addItemDisabled} variant="contained" color="primary">
          Add item
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ManageItemsDialog.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  open: PropTypes.bool.isRequired,
  cancel: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string.isRequired,
  tooltipTitle: PropTypes.string.isRequired,
  subheader: PropTypes.string.isRequired,
};

export default ManageItemsDialog;
