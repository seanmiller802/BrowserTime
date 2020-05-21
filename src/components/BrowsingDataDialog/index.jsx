// // https://developer.chrome.com/extensions/browsingData
// import React, { useState, forwardRef } from 'react';
// import PropTypes from 'prop-types';
// import { makeStyles, withStyles } from '@material-ui/styles';
// import {
//   Slide,
//   Button,
//   Box,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   Tabs,
//   Tab,
//   Typography,
//   FormGroup,
//   FormControlLabel,
//   Checkbox,
// } from '@material-ui/core';

// const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

// const TabPanel = ({
//   children, value, index, ...other
// }) => (
//   <div
//     role="tabpanel"
//     hidden={value !== index}
//     id={`simple-tabpanel-${index}`}
//     aria-labelledby={`simple-tab-${index}`}
//     {...other}
//   >
//     {value === index && (
//       <Box p={3}>
//         <Typography>{children}</Typography>
//       </Box>
//     )}
//   </div>
// );

// TabPanel.propTypes = {
//   children: PropTypes.node.isRequired,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// const a11yProps = (index) => (
//   {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   }
// );

// const useStyles = makeStyles((theme) => ({
//   title: {
//     margin: theme.spacing(2),
//   },
// }));

// const BrowsingDataDialog = ({ open, cancel, clear }) => {
//   const classes = useStyles();
//   const [options, setOptions] = useState({
//     appcache: true,
//     cache: true,
//     cacheStorage: true,
//     cookies: true,
//     downloads: true,
//     fileSystems: true,
//     formData: true,
//     history: true,
//     indexedDB: true,
//     localStorage: true,
//     pluginData: true,
//     passwords: true,
//     serviceWorkers: true,
//     webSQL: true,
//   });
//   const [selectedTab, setSelectedTab] = useState(0);

//   const handleChange = (event, newValue) => {
//     setSelectedTab(newValue);
//   };

//   return (
//     <div>
//       <Dialog
//         open={open}
//         onBackdropClick={cancel}
//         onEscapeKeyDown={cancel}
//         TransitionComponent={Transition}
//         aria-labelledby="alert-dialog-slide-title"
//         aria-describedby="alert-dialog-slide-description"
//       >
//         <Typography className={classes.title}>Clear browsing data</Typography>
//         <Tabs value={selectedTab} onChange={handleChange} aria-label="simple tabs example">
//           <Tab label="Basic" {...a11yProps(0)} />
//           <Tab label="Advanced" {...a11yProps(1)} />
//         </Tabs>
//         <DialogContent>
//           <TabPanel value={selectedTab} index={0}>
            
//           </TabPanel>
//           <TabPanel value={selectedTab} index={1}>
            
//           </TabPanel>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={cancel} color="secondary" variant="outlined">
//             Cancel
//           </Button>
//           <Button onClick={cancel} color="primary" variant="contained">
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// BrowsingDataDialog.propTypes = {
//   open: PropTypes.bool.isRequired,
//   cancel: PropTypes.func.isRequired,
//   clear: PropTypes.func.isRequired,
// };

// export default BrowsingDataDialog;
