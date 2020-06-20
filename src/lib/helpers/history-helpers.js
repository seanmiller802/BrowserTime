/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import _ from 'lodash';
import moment from 'moment';
import { format } from 'd3-format';
import { getDisplayUrl } from './url-helpers';
import { getLastSeven, getStartOfDay } from './millisecond-helpers';
import sites from '../data/top-sites.json';

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

const calculatePercentChange = (one, two) => {
  const diff = one - two;
  return Math.round((diff / one) * 100);
};

export const enrichHistory = (data) => {
  const startOfLastSeven = getLastSeven();
  let weekOneTotal = 0;
  let weekTwoTotal = 0;
  data.forEach((day) => {
    if (getStartOfDay(day.date) < startOfLastSeven) {
      weekOneTotal += day.items.length;
    } else {
      weekTwoTotal += day.items.length;
    }
  });
  const percentChange = calculatePercentChange(weekOneTotal, weekTwoTotal);
  let uniqueSites = {};
  const categoryCounts = {};
  const weekTwoData = data.filter((day) => getStartOfDay(day.date) >= startOfLastSeven);
  const enhancedData = weekTwoData.map((day) => {
    // get top site of each day
    const countedSites = _.countBy(day.items, (item) => {
      const url = getDisplayUrl(item.url);
      if (!uniqueSites[url]) {
        uniqueSites[url] = 1;
      } else {
        uniqueSites[url] += 1;
      }
      return url;
    });
    const topSite = Object.keys(countedSites).reduce((a, b) => (countedSites[a] > countedSites[b] ? a : b));
    // group each day's history by category
    const categorizedHistory = _(day.items)
      .groupBy((item) => {
        const category = getCategory(item.url);
        if (!categoryCounts[category]) {
          categoryCounts[category] = 1;
        } else {
          categoryCounts[category] += 1;
        }
        return category;
      })
      .map((value, key) => ({ category: key, items: value }))
      .value();
    // get top category of each day
    const { category } = categorizedHistory.reduce((prev, current) => ((prev.items.length > current.items.length) ? prev : current));
    return {
      date: day.date,
      topCategory: category,
      topSite,
      history: categorizedHistory,
      count: day.items.length,
    };
  });
  const topCategory = _.maxBy(_.keys(categoryCounts), (c) => categoryCounts[c]);
  const mostVisited = _.maxBy(_.keys(uniqueSites), (s) => uniqueSites[s]);
  uniqueSites = format(',')(Object.keys(uniqueSites).length);
  return {
    totalUniqueSites: uniqueSites,
    topCategory,
    mostVisited,
    percentChange,
    data: enhancedData,
  };
};
