import _ from 'lodash';
import moment from 'moment';

// takes an array of history items and outputs the data grouped by dayte
export const groupHistoryByDate = (data) => _(data)
  .groupBy((item) => moment(item.lastVisitTime).startOf('day'))
  .map((value, key) => ({ date: key, items: value }))
  .value();

// export const getHistoryTitle = () => {
//   if (['Custom'].includes(range)) {
//     if (moment(customRange.start).startOf('day').isSame(moment(customRange.end).startOf('day'))) {
//       return moment(customRange.start).format('dddd, MMMM Do, Y');
//     }
//     return `${moment(customRange.start).format('dddd, MMMM Do, Y')} - ${moment(customRange.end).format('dddd, MMMM Do, Y')}`;
//   }

//   if (['Hour'].includes(range)) {
//     return 'Last hour';
//   }

//   if (['Today'].includes(range)) {
//     return 'Today';
//   }

//   if (['Yesterday'].includes(range)) {
//     return 'Yesterday';
//   }

//   if (['Seven', 'Fourteen', 'Thirty'].includes(range)) {
//     return 'Since';
//   }
// };
// }