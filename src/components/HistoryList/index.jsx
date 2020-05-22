import React, { useContext } from 'react';
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
import { SettingsContext } from '../../context/SettingsContext';

const useStyles = makeStyles((theme) => ({
  historyListGrid: {
    marginTop: theme.spacing(3),
  },
}));

const HistoryList = ({
  data,
  getSelectedForDeleteIndex,
  handleSelectedForDelete,
  searchText,
  handleMoreFromThisSite,
}) => {
  const classes = useStyles();
  const { settingsState } = useContext(SettingsContext);
  const { date, items } = data;

  const isSelectedForDelete = (val) => getSelectedForDeleteIndex(val) > -1;

  const Row = ({ index, style }) => {
    const isSelected = isSelectedForDelete({ lastVisitTime: items[index].lastVisitTime });
    return (
      <div style={style}>
        <HistoryListItem
          item={items[index]}
          isSelectedForDelete={isSelected}
          handleSelectedForDelete={handleSelectedForDelete}
          handleMoreFromThisSite={handleMoreFromThisSite}
        />
      </div>
    );
  };

  Row.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.shape({}).isRequired,
  };

  const title = moment(date).format('dddd, MMMM Do, Y');
  const showSubheader = settingsState.showResultsCount;
  const defaultSubheader = `${items.length.toLocaleString()} results`;
  const subheader = searchText.length > 0 ? `${defaultSubheader} for '${searchText}'` : defaultSubheader;

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
          subheader={showSubheader ? subheader : null}
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

HistoryList.propTypes = {
  data: PropTypes.shape({
    date: PropTypes.instanceOf(Date),
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  getSelectedForDeleteIndex: PropTypes.func.isRequired,
  handleSelectedForDelete: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  handleMoreFromThisSite: PropTypes.func.isRequired,
};

export default HistoryList;
