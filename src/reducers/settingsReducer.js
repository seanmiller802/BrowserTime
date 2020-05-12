
const updateSettings = (settingName, settingValue, state) => {
  const updatedSettings = { ...state, [settingName]: settingValue };
  return updatedSettings;
};

// eslint-disable-next-line import/prefer-default-export
export const settingsReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_SETTINGS':
      return updateSettings(action.settingName, action.settingValue, state);
    default:
      return state;
  }
};
