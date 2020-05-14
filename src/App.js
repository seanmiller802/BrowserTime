/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from './context/ThemeContext';
import { SettingsProvider } from './context/SettingsContext';
import Header from './components/Header';
import CustomDrawer from './components/CustomDrawer';
import History from './components/History';
import Dashboard from './components/Dashboard';

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
  const [maxResults, setMaxResults] = useState(100);

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
