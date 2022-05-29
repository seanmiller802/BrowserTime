/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from './context/ThemeContext';
import { SettingsProvider } from './context/SettingsContext';
import Header from './components/Header';
import CustomDrawer from './components/CustomDrawer';
import History from './components/History';
import DashboardV2 from './components/DashboardV2';
import Dashboard from './components/Dashboard';
import DeleteToolbar from './components/DeleteToolbar';
import ConfirmDeleteDialog from './components/ConfirmDeleteDialog';
import FeedbackDialog from './components/FeedbackDialog';
import {
  searchHistory,
  getSearchParams,
  deleteHistoryItems,
  deleteAllHistory,
} from './lib/helpers/chrome-helpers';
import { groupHistoryByDate } from './lib/helpers/history-helpers';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

const App = () => {
  const classes = useStyles();
  const [selectedForDelete, setSelectedForDelete] = useState([]); // history items currently selected for deletion
  const [clearSelected, setClearSelected] = useState(false); // use this instead of selectedForDelete to trigger useEffect
  const [showConfirmDelete, setShowConfirmDelete] = useState(false); // comfirmation dialog when deleting all history
  const [showDashboard, setShowDashboard] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showControls, setShowControls] = useState(false); // show filter controls

  // history search values
  const [searchText, setSearchText] = useState('');
  const [range, setRange] = useState('Today');
  const [customRange, setCustomRange] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [maxResults, setMaxResults] = useState(10000);

  const [history, setHistory] = useState([]);

  // update history results if any of the controls change
  useEffect(() => {
    const searchParams = getSearchParams(searchText, range, customRange, maxResults);
    searchHistory(searchParams)
      .then((results) => {
        const sortedHistory = groupHistoryByDate(results);
        setHistory(sortedHistory);
      })
      .catch((error) => console.error('App useEffect error getting history', error));
  }, [clearSelected, searchText, range, customRange, maxResults]);

  const forceUpdate = () => {
    setClearSelected(!clearSelected);
  };

  const handleUpdateRange = (val) => {
    setShowDashboard(false);
    // always show filter controls when custom range is selected
    if (val === 'Custom') {
      setShowControls(true);
    }
    setRange(val);
  };

  const handleShowDashboard = () => {
    setShowDashboard(true);
    setRange(null);
  };

  const handleShowFeedbackForm = () => {
    setShowFeedbackForm(true);
  };

  // use lastVisitTime to check if an item is selected for deletion
  // PRETTY sure no two items should ever have the same value
  const getSelectedForDeleteIndex = ({ lastVisitTime }) => selectedForDelete
    .map((e) => e.lastVisitTime)
    .indexOf(lastVisitTime);

  // remove item if already selected. add otherwise.
  const handleSelectedForDelete = (item) => {
    const index = getSelectedForDeleteIndex(item);
    let updated;
    if (index > -1) {
      updated = Array.apply([], selectedForDelete);
      updated.splice(index, 1);
      setSelectedForDelete(updated);
    } else {
      updated = selectedForDelete.concat([item]);
      setSelectedForDelete(updated);
    }
  };

  // delete selected items
  const handleDeleteItems = () => {
    deleteHistoryItems(selectedForDelete)
      .then(() => {
        setSelectedForDelete([]);
        forceUpdate();
      })
      .catch((error) => console.error('Error deleting selected history items', error));
  };

  // delete single history item
  const handleDeleteSingleItem = (item) => {
    deleteHistoryItems([item])
      .then(() => {
        setSelectedForDelete([]);
        forceUpdate();
      })
      .catch((error) => console.error('Error deleting single history item', error));
  };

  // delete entire history
  const handleDeleteAll = () => {
    deleteAllHistory()
      .then(() => {
        setShowConfirmDelete(false);
      })
      .catch((error) => console.error('Error deleting history items', error));
  };

  // get history results using the url as searchText
  const handleMoreFromThisSite = (text) => {
    setSearchText(text);
    setShowControls(true);
  };

  const handleSearchTextChange = (val) => {
    setSearchText(val);
  };

  const showDeleteToolbar = selectedForDelete.length > 0;

  const shouldShowDashboardV2 = true;
  
  return (
    <div className={classes.root}>
      <SettingsProvider>
        <ThemeProvider>
          <CssBaseline />
          <ConfirmDeleteDialog
            open={showConfirmDelete}
            deleteAll={handleDeleteAll}
            cancel={() => setShowConfirmDelete(false)}
          />
          {showFeedbackForm && (
            <FeedbackDialog
              open={showFeedbackForm}
              cancel={() => setShowFeedbackForm(false)}
            />
          )}
          {showDeleteToolbar && (
            <DeleteToolbar
              count={selectedForDelete.length}
              cancel={() => setSelectedForDelete([])}
              deleteItems={() => handleDeleteItems()}
            />
          )}
          {!showDeleteToolbar && <Header /> }
          <CustomDrawer
            range={range}
            handleUpdateRange={handleUpdateRange}
            handleShowDashboard={handleShowDashboard}
            handleShowFeedbackForm={handleShowFeedbackForm}
          />
          {!showDashboard && (
            <History
              history={history}
              searchText={searchText}
              setSearchText={handleSearchTextChange}
              showControls={showControls}
              setShowControls={setShowControls}
              handleDeleteAll={() => setShowConfirmDelete(true)}
              range={range}
              handleUpdateRange={handleUpdateRange}
              customRange={customRange}
              handleUpdateCustomRange={setCustomRange}
              maxResults={maxResults}
              setMaxResults={setMaxResults}
              getSelectedForDeleteIndex={getSelectedForDeleteIndex}
              handleSelectedForDelete={handleSelectedForDelete}
              handleMoreFromThisSite={handleMoreFromThisSite}
              handleDeleteSingleItem={handleDeleteSingleItem}
              forceUpdate={forceUpdate}
            />
          )}
          {showDashboard && (shouldShowDashboardV2 ? <DashboardV2 /> : <Dashboard />)}
        </ThemeProvider>
      </SettingsProvider>
    </div>
  );
};

export default App;
