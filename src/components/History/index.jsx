import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import Layout from '../Layout';
import HistorySearch from '../HistorySearch';
import HistoryControls from '../HistoryControls';
import HistoryList from '../HistoryList';
import EmptyStateIllustration from '../EmptyStateIllustration';
import { ThemeContext } from '../../context/ThemeContext';

const useStyles = makeStyles((theme) => ({
  history: {
    flexGrow: 1,
    justifyContent: 'center',
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
  handleMoreFromThisSite,
  handleDeleteSingleItem,
  forceUpdate,
}) => {
  const classes = useStyles();
  const currentTheme = useContext(ThemeContext);
  const background = currentTheme.palette.background.dark;
  const primary = currentTheme.palette.primary.main;

  console.log('currentgdfhaafgf', currentTheme);
  const hasHistory = history.length > 0;

  const controls = showControls && (
    <HistoryControls
      range={range}
      handleUpdateRange={handleUpdateRange}
      customRange={customRange}
      handleUpdateCustomRange={handleUpdateCustomRange}
      maxResults={maxResults}
      setMaxResults={setMaxResults}
    />
  );

  const list = history.map((day) => (
    <HistoryList
      data={day}
      getSelectedForDeleteIndex={getSelectedForDeleteIndex}
      handleSelectedForDelete={handleSelectedForDelete}
      searchText={searchText}
      handleMoreFromThisSite={handleMoreFromThisSite}
      handleDeleteSingleItem={handleDeleteSingleItem}
      forceUpdate={forceUpdate}
    />
  ));

  return (
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
        {hasHistory && (
          <>
            {controls}
            {list}
          </>
        )}
        {!hasHistory && (
          <div style={{ marginTop: 60, textAlign: 'center' }}>
            <EmptyStateIllustration primary={primary} background={background} />
            <Typography variant="h2" display="block" gutterBottom>No results to show</Typography>
            <Typography variant="caption" display="block">Try changing your search or visiting a website</Typography>
          </div>
        )}
      </div>
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
  handleMoreFromThisSite: PropTypes.func.isRequired,
  handleDeleteSingleItem: PropTypes.func.isRequired,
  forceUpdate: PropTypes.func.isRequired,
};

History.defaultProps = {
  range: 'Today',
};

export default History;
