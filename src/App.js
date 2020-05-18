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
  const [showDashboard, setShowDashboard] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showControls, setShowControls] = useState(false);
  const [range, setRange] = useState('Today');
  const [customRange, setCustomRange] = useState({
    start: new Date(),
    end: new Date(),
  });

  console.log("APP start date", customRange.start);
  console.log("APP end date", customRange.end);
  const [maxResults, setMaxResults] = useState(10000);
  const [history, setHistory] = useState([]);

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
    console.log('APP handleUpdateRange', val);
    setShowDashboard(false);
    setRange(val);
  };

  const handleShowDashboard = () => {
    console.log('APP handleShowDashboard');
    setShowDashboard(true);
  };

  return (
    <div className={classes.root}>
      <SettingsProvider>
        <ThemeProvider>
          <CssBaseline />
          <Header />
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
            />
          )}
          {showDashboard && <Dashboard />}
        </ThemeProvider>
      </SettingsProvider>
    </div>
  );
};

export default App;
