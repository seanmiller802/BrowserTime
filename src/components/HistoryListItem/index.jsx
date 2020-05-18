import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  ListItem,
  ListItemIcon,
  Typography,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Fade,
  Tooltip,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  item: {
    height: 50,
  },
  listItemText: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTime: {
    marginRight: theme.spacing(4),
  },
  itemTitle: {
    marginRight: theme.spacing(2),
    maxWidth: 650,
  },
}));

const HistoryListItem = ({ item }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    id,
    title,
    lastVisitTime,
    typedCount,
    url,
    visitCount,
  } = item;

  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const labelId = `checkbox-list-label-${id}`;

  const time = moment(lastVisitTime).toString();
  const displayTime = moment(lastVisitTime).format('h:mm A');

  return (
    <ListItem key={id} className={classes.item} role={undefined} onClick={() => {}}>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={false}
          tabIndex={-1}
          inputProps={{ 'aria-labelledby': labelId }}
        />
      </ListItemIcon>
      <div className={classes.listItemText}>
        <Tooltip title={time} placement="bottom" arrow aria-label="time">
          <Typography className={classes.itemTime} variant="body2" noWrap>{displayTime}</Typography>
        </Tooltip>
        <Typography className={classes.itemTitle} variant="h6" noWrap>{title}</Typography>
        <Typography className={classes.itemUrl} variant="body2" noWrap>github.com</Typography>
      </div>
      <IconButton edge="end" aria-controls="history-item-menu" aria-label="options" aria-haspopup="true" onClick={handleMenuClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="history-item-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleMenuClose}>More from this site</MenuItem>
        <MenuItem onClick={handleMenuClose}>Remove item</MenuItem>
      </Menu>
    </ListItem>
  );
};

// HistoryListItem.propTypes = {
//   item: PropTypes.shape({}).isRequired,
// };

export default HistoryListItem;
