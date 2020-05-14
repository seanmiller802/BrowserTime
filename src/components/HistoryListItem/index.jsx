import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const HistoryListItem = ({
  id,
  title,
  lastVisitTime,
  typedCount,
  url,
  visitCount,
}) => {
  const classes = useStyles();
  const labelId = `checkbox-list-label-${id}`;

  return (
    <ListItem key={id} role={undefined} dense divider onClick={() => {}}>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked
          tabIndex={-1}
          inputProps={{ 'aria-labelledby': labelId }}
        />
      </ListItemIcon>
      <ListItemText id={id} primary={title} secondary={moment(lastVisitTime)} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="options">
          <MoreVertIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default HistoryListItem;
