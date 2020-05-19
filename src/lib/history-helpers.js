/* eslint-disable import/prefer-default-export */
import _ from 'lodash';
import moment from 'moment';

// takes an array of history items and outputs the data grouped by date
export const groupHistoryByDate = (data) => _(data)
  .groupBy((item) => moment(item.lastVisitTime).startOf('day'))
  .map((value, key) => ({ date: key, items: value }))
  .value();
