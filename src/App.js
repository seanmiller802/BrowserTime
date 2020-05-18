/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from './context/ThemeContext';
import { SettingsProvider } from './context/SettingsContext';
import Header from './components/Header';
import CustomDrawer from './components/CustomDrawer';
import History from './components/History';
import Dashboard from './components/Dashboard';
import DeleteToolbar from './components/DeleteToolbar';
import { searchHistory, prepareSearchObject } from './lib/chrome-helpers';
import { groupHistoryByDate } from './lib/history-helpers';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

const App = () => {
  const classes = useStyles();
  const [selectedForDelete, setSelectedForDelete] = useState([]);
  const [showDashboard, setShowDashboard] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showControls, setShowControls] = useState(false);
  const [range, setRange] = useState('Today');
  const [customRange, setCustomRange] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [maxResults, setMaxResults] = useState(1000);
  const [history, setHistory] = useState([]);

  console.log('APP selectedForDelete', selectedForDelete);

  // update history results if any of the controls change
  useEffect(() => {
    console.log('useEffect baby');
    const queryObj = prepareSearchObject(searchText, range, customRange, maxResults);
    searchHistory(queryObj)
      .then((results) => {
        const sortedHistory = groupHistoryByDate(results);
        setHistory(sortedHistory);
      })
      .catch((error) => console.error('Error getting history', error));
  }, [searchText, range, customRange, maxResults]);

  const handleUpdateRange = (val) => {
    // console.log('APP handleUpdateRange', val);
    setShowDashboard(false);
    setRange(val);
  };

  const handleShowDashboard = () => {
    // console.log('APP handleShowDashboard');
    setShowDashboard(true);
  };

  // use lastVisitTime to check if item already exists
  // since no two items should have the same value
  const getSelectedForDeleteIndex = ({ lastVisitTime }) => {
    return selectedForDelete.map((e) => e.lastVisitTime).indexOf(lastVisitTime);
  };

  // remove item if already selected. add otherwise.
  const handleUpdateSelectedForDelete = (item) => {
    const index = getSelectedForDeleteIndex(item);
    let updated;
    if (index > -1) {
      const remaining = Array.apply([], selectedForDelete).splice(index, 1);
      setSelectedForDelete(remaining);
    } else {
      updated = selectedForDelete.concat([item]);
      setSelectedForDelete(updated);
    }
  };

  const handleDeleteItems = () => {
    console.log('handleDeleteItems');
    // TODO - delete each item here
    setSelectedForDelete([]);
  };

  const showDeleteToolbar = selectedForDelete.length > 0;

  return (
    <div className={classes.root}>
      <SettingsProvider>
        <ThemeProvider>
          <CssBaseline />
          {showDeleteToolbar && (
            <DeleteToolbar
              count={selectedForDelete.length}
              cancel={() => setSelectedForDelete([])}
              deleteItems={handleDeleteItems}
            />
          )}
          {!showDeleteToolbar && <Header /> }
          <CustomDrawer
            handleUpdateRange={handleUpdateRange}
            handleShowDashboard={handleShowDashboard}
          />
          {!showDashboard && (
            <History
              history={history}
              searchText={searchText}
              setSearchText={setSearchText}
              showControls={showControls}
              setShowControls={setShowControls}
              range={range}
              handleUpdateRange={handleUpdateRange}
              customRange={customRange}
              handleUpdateCustomRange={setCustomRange}
              maxResults={maxResults}
              setMaxResults={setMaxResults}
              getSelectedForDeleteIndex={getSelectedForDeleteIndex}
              handleUpdateSelectedForDelete={handleUpdateSelectedForDelete}
            />
          )}
          {showDashboard && <Dashboard />}
        </ThemeProvider>
      </SettingsProvider>
    </div>
  );
};

export default App;
