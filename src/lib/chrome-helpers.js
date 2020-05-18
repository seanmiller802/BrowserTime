import {
  getLastHour,
  getToday,
  getYesterday,
  getLastSeven,
  getLastFourteen,
  getLastThirty,
  getCustom,
} from './millisecond-helpers';

export const prepareSearchObject = (
  searchText,
  range,
  customRange,
  maxResults,
) => {
  let start;
  let end;
  let yesterday;
  let custom;

  // use millisecond helper fns to get our start and end milliseconds.
  // use default for custom range
  switch (range) {
    case 'Hour':
      start = getLastHour();
      break;
    case 'Today':
      start = getToday();
      break;
    case 'Yesterday':
      yesterday = getYesterday(customRange.start, customRange.end);
      start = yesterday.start;
      end = yesterday.end;
      break;
    case 'Seven':
      start = getLastSeven();
      break;
    case 'Fourteen':
      start = getLastFourteen();
      break;
    case 'Thirty':
      start = getLastThirty();
      break;
    default:
      custom = getCustom(customRange.start, customRange.end);
      start = custom.start;
      end = custom.end;
  }

  const searchObject = {
    text: searchText,
    maxResults,
    startTime: start,
  };

  if (end) {
    searchObject.endTime = end;
  }

  return searchObject;
};

export const searchHistory = (queryObject) => new Promise((resolve, reject) => {
  chrome.history.search({
    ...queryObject,
  }, (items, error) => {
    if (error) reject(error);
    resolve(items);
  });
});
