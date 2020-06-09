/* eslint-disable import/prefer-default-export */
import _ from 'lodash';
import moment from 'moment';
import { getDisplayUrl } from './url-helpers';
import sites from './data/top-sites.json';

const getCategory = (url) => {
  const categories = ['News', 'Adult', 'Sports', 'Shopping', 'Entertainment', 'Social_Networking', 'Financial_Services', 'Search_Engines'];
  let { hostname } = new URL(url);
  hostname = hostname.substring(0, 4) === 'www.' ? hostname.substring(4) : hostname;
  if (sites[hostname]) {
    if (categories.includes(sites[hostname])) {
      return sites[hostname];
    }
  }
  return 'Other';
};

// takes an array of history items and outputs the data grouped by date
export const groupHistoryByDate = (data) => _(data)
  .groupBy((item) => moment(item.lastVisitTime).startOf('day'))
  .map((value, key) => ({ date: key, items: value }))
  .value();


// categorize each day's history items, find top site and category of each day
export const enrichHistory = (data) => {
  const enhancedData = data.map((day) => {
    const countedSites = _.countBy(day.items, (item) => getDisplayUrl(item.url));
    const topSite = Object.keys(countedSites).reduce((a, b) => (countedSites[a] > countedSites[b] ? a : b));
    const categorizedHistory = _(day.items)
      .groupBy((item) => getCategory(item.url))
      .map((value, key) => ({ category: key, items: value }))
      .value();
    const { category } = categorizedHistory.reduce((prev, current) => ((prev.items.length > current.items.length) ? prev : current));
    return {
      date: day.date,
      topCategory: category,
      topSite,
      history: categorizedHistory,
      count: day.items.length,
    };
  });
  return enhancedData;
};
