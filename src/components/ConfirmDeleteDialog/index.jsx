import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Slide,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    paddingBottom: theme.spacing(4),
  },
}));

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const ConfirmDeleteDialog = ({ open, cancel, deleteAll }) => {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={open}
        onBackdropClick={cancel}
        onEscapeKeyDown={cancel}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Hold up</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Typography variant="h4">Do you really want to delete all of your history?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancel}>
            Cancel
          </Button>
          <Button onClick={deleteAll} variant="contained" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ConfirmDeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  cancel: PropTypes.func.isRequired,
  deleteAll: PropTypes.func.isRequired,
};

export default ConfirmDeleteDialog;
