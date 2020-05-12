/* eslint-disable react/jsx-filename-extension */
import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import { createTheme } from '../lib/theme/index';
import { SettingsContext } from './SettingsContext';

export const ThemeContext = createContext();
ThemeContext.displayName = 'ThemeContext';

export const ThemeProvider = ({ children }) => {
  // eslint-disable-next-line no-unused-vars
  const { settingsState, updateSettings } = useContext(SettingsContext);
  const currentTheme = createTheme(settingsState.theme);

  return (
    <ThemeContext.Provider value={currentTheme}>
      <ThemeContext.Consumer>
        {(value) => (
          <MuiThemeProvider theme={value}>
            {children}
          </MuiThemeProvider>
        )}
      </ThemeContext.Consumer>
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
