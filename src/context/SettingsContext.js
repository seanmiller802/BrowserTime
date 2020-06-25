/* eslint-disable react/jsx-filename-extension */
import React, {
  createContext,
  useReducer,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { settingsReducer } from '../reducers/settingsReducer';
import { THEMES } from '../lib/constants/index';

export const SettingsContext = createContext();
SettingsContext.displayName = 'SettingsContext';

export const SettingsProvider = ({ children }) => {
  const [settingsState, dispatch] = useReducer(settingsReducer, {}, () => {
    const localData = localStorage.getItem('settings');
    return localData ? JSON.parse(localData) : { theme: THEMES.DARK, showResultsCount: true };
  });

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settingsState));
  }, [settingsState]);

  const updateSettings = (settingName, settingValue) => {
    dispatch({
      type: 'UPDATE_SETTINGS',
      settingName,
      settingValue,
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        settingsState,
        updateSettings,
      }}
    >
      <SettingsContext.Consumer>
        {() => children}
      </SettingsContext.Consumer>
    </SettingsContext.Provider>
  );
};

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
