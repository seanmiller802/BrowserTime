import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const FeedbackDialog = ({ open, cancel}) => {
  const [val, setVal] = useState("");
  const [err, setErr] = useState(false);

  const handleClose = () => {
  };

  const handleTextChange = (feedback) => {
    setVal(feedback);
  };

  const handleSubmit = () => {
    if (val === '') {
      setErr(true);
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Feedback</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Feel free to share bugs, feature requests, ideas, or anything else you want to say!
          </DialogContentText>
          <TextField
            id="outlined-multiline-static"
            multiline
            fullWidth
            autoFocus
            rows={6}
            variant="filled"
            value={val}
            error={err}
            onChange={(e) => handleTextChange(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={cancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="outlined">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

FeedbackDialog.propTypes = {
    open: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
};

export default FeedbackDialog;
