/* eslint-disable react/jsx-filename-extension */
import React, {
  createContext,
  useReducer,
} from 'react';
import PropTypes from 'prop-types';
import { THEMES } from '../lib/constants';
import { settingsReducer } from '../reducers/settingsReducer';

const initialSettingsState = {
  theme: THEMES.DARK,
};

export const SettingsContext = createContext(initialSettingsState);
SettingsContext.displayName = 'SettingsContext';

export const SettingsProvider = ({ children }) => {
  const [settingsState, dispatch] = useReducer(settingsReducer, initialSettingsState);

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
