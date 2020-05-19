import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const ConfirmDeleteModal = ({ open, cancel, deleteAll }) => (
  <div>
    <Dialog
      open={open}
      onBackdropClick={cancel}
      onEscapeKeyDown={cancel}
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">Hey</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Do you really want to delete all your history?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancel} color="primary">
          Cancel
        </Button>
        <Button onClick={deleteAll} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

ConfirmDeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  cancel: PropTypes.func.isRequired,
  deleteAll: PropTypes.func.isRequired,
};

export default ConfirmDeleteModal;
