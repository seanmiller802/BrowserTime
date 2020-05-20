/* eslint-disable no-plusplus */
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

// uses the lastVisitTime of each item as the start and end time in order to delete 1 item at a time
export const deleteHistoryItems = (itemsToDelete) => new Promise((resolve, reject) => {
  try {
    let startTime;
    let endTime;
    for (let i = 0; i < itemsToDelete.lenght; i++) {
      startTime = itemsToDelete[i].lastVisitTime;
      endTime = itemsToDelete[i].lastVisitTime;
      chrome.history.deleteRange({ startTime, endTime }, () => console.log('deleted item'));
    }
    resolve();
  } catch (error) {
    reject(error);
  }
});

// delete entire user history
export const deleteAllHistory = () => new Promise((resolve, reject) => {
  try {
    chrome.history.deleteAll(() => resolve());
  } catch (error) {
    reject(error);
  }
});

// // return info about the day's top site
// export const getTodaysTopSite = () => new Promise((resolve, reject) => {
//   try {
//     searchHistory({ text: '', maxResults: 5000, range: 'Today' })
//     .then((data) => {

//     });
//   } catch (error) {
//     reject(error);
//   }
// });
