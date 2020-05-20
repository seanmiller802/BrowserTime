import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Layout from '../Layout';
import HistorySearch from '../HistorySearch';
import HistoryControls from '../HistoryControls';
import HistoryList from '../HistoryList';

const useStyles = makeStyles((theme) => ({
  history: {
    padding: theme.spacing(3),
  },
  search: {
    marginBottom: theme.spacing(2),
  },
}));

const History = ({
  history,
  searchText,
  setSearchText,
  showControls,
  setShowControls,
  handleDeleteAll,
  range,
  handleUpdateRange,
  customRange,
  handleUpdateCustomRange,
  maxResults,
  setMaxResults,
  getSelectedForDeleteIndex,
  handleSelectedForDelete,
}) => {
  const classes = useStyles();
  const hasHistory = history.length > 0;

  return hasHistory ? (
    <Layout>
      <div className={classes.history}>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.search}
        >
          <HistorySearch
            placeholder="Search History"
            value={searchText}
            onChange={setSearchText}
            showControls={showControls}
            handleShowControls={() => setShowControls(!showControls)}
            handleDeleteAll={handleDeleteAll}
          />
        </Grid>
        {showControls && (
          <HistoryControls
            range={range}
            handleUpdateRange={handleUpdateRange}
            customRange={customRange}
            handleUpdateCustomRange={handleUpdateCustomRange}
            maxResults={maxResults}
            setMaxResults={setMaxResults}
          />
        )}
        {history.map((day) => (
          <HistoryList
            data={day}
            getSelectedForDeleteIndex={getSelectedForDeleteIndex}
            handleSelectedForDelete={handleSelectedForDelete}
            searchText={searchText}
          />
        ))}
      </div>
    </Layout>
  ) : (
    <Layout>
      <div>no history to display - add a cool image here</div>
    </Layout>
  );
};

History.propTypes = {
  history: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
  })).isRequired,
  searchText: PropTypes.string.isRequired,
  setSearchText: PropTypes.func.isRequired,
  showControls: PropTypes.bool.isRequired,
  setShowControls: PropTypes.func.isRequired,
  handleDeleteAll: PropTypes.func.isRequired,
  range: PropTypes.oneOf([
    'Today',
    'Yesterday',
    'Seven',
    'Fourteen',
    'Thirty',
    'Custom',
  ]),
  customRange: PropTypes.shape({}).isRequired,
  handleUpdateCustomRange: PropTypes.func.isRequired,
  handleUpdateRange: PropTypes.func.isRequired,
  maxResults: PropTypes.number.isRequired,
  setMaxResults: PropTypes.func.isRequired,
  getSelectedForDeleteIndex: PropTypes.func.isRequired,
  handleSelectedForDelete: PropTypes.func.isRequired,
};

History.defaultProps = {
  range: 'Today',
};

export default History;
