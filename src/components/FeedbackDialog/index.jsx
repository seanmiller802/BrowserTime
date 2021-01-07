import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  email: {
    marginBottom: theme.spacing(1),
  },
  responseText: {
    marginTop: theme.spacing(1),
  }
}));

const POST_URL = 'https://getform.io/f/45545d77-d55a-40a5-8f48-d1352091992e';

const FeedbackDialog = ({ open, cancel}) => {
  const classes = useStyles();

  const [emailSent, setEmailSent] = useState(false);
  const [emailSendError, setEmailSendError] = useState(false);

  const sendEmail = (formData, setSubmitting, resetForm) => {
    axios.post(POST_URL, formData)
      .then(() => {
        setSubmitting(false);
        setEmailSent(true);
        resetForm({ values: { email: '', message: '' }});
        setTimeout(() => {
          setEmailSent(false);
          cancel();
        }, 3000);
      }, function() {
        setEmailSendError(true);
        setTimeout(() => {
          setEmailSendError(false);
        }, 3000);
      });
  }

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Feedback</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Feel free to share bugs, feature requests, ideas, or anything else you want to say!
        </DialogContentText>
        <Formik
          initialValues={{ email: '', message: '' }}
          validate={values => {
            const errors = {};
            if (!values.message) {
              errors.message = 'Required';
            }
            if (values.email.length) {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
              sendEmail(values, setSubmitting, resetForm);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                name="email"
                placeholder="Email (optional)"
                type="email"
                className={classes.email}
                autoFocus
                fullWidth
                autoFocus
                variant="filled"
                value={values.email}
                error={errors.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && <Typography variant="body2" color="error">{errors.email}</Typography>}
              <TextField
                name="message"
                placeholder="Message (required)"
                multiline
                fullWidth
                rows={6}
                variant="filled"
                value={values.message}
                error={errors.message}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.message && touched.message && <Typography variant="body2" color="error">{errors.message}</Typography>}
              {emailSent && <Typography variant="body1" color="primary" align="center" className={classes.responseText}>Email sent</Typography>}
              {emailSendError && <Typography variant="body1" color="error" align="center" className={classes.responseText}>Something went wrong. Please try again.</Typography>}
              <DialogActions>
                <Button onClick={cancel} disabled={isSubmitting} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} type="submit" disabled={isSubmitting} color="primary" variant="outlined">
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

FeedbackDialog.propTypes = {
  open: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
};

export default FeedbackDialog;
