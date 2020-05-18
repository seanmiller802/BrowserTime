import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FixedSizeList as List } from 'react-window';
import {
  Grid,
  Card,
  CardHeader,
  Divider,
  CardContent,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import HistoryListItem from '../HistoryListItem';

const useStyles = makeStyles((theme) => ({
  historyListGrid: {
    marginTop: theme.spacing(3),
  },
}));

const HistoryList = ({ data, getSelectedForDeleteIndex, handleUpdateSelectedForDelete }) => {
  const classes = useStyles();
  const { date, items } = data;
  console.log('HistoryList', data);

  const isChecked = (val) => getSelectedForDeleteIndex(val) > -1;

  const Row = ({ index, style }) => {
    const itemIsChecked = isChecked({ lastVisitTime: items[index].lastVisitTime });
    console.log('Row item is checked', itemIsChecked);
    return (
      <HistoryListItem
        item={items[index]}
        style={style}
        isChecked={itemIsChecked}
        handleUpdateSelectedForDelete={handleUpdateSelectedForDelete}
      />
    );
  };

  const title = moment(date).format('dddd, MMMM Do, Y');
  const subheader = `${items.length.toLocaleString()} results`;

  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      className={classes.historyListGrid}
    >
      <Card>
        <CardHeader
          title={title}
          subheader={subheader}
          titleTypographyProps={{
            variant: 'h5',
          }}
        />
        <Divider variant="fullWidth" light />
        <CardContent>
          <List
            height={1000}
            itemCount={items.length}
            itemSize={50}
            width={950}
          >
            {Row}
          </List>
        </CardContent>
      </Card>
    </Grid>
  );
};

// HistoryList.propTypes = {
//   historyItems: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.object),
//     PropTypes.array,
//   ]).isRequired,
//   title: PropTypes.string.isRequired,
// };

export default HistoryList;
