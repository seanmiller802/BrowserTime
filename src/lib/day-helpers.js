import moment from 'moment';

// checks if a date is today
export const isToday = (date) => {
  const today = moment().startOf('day').valueOf();
  const other = moment(date).startOf('day').valueOf();
  return moment(today).isSame(other);
};

// checks if a date is yesterday
export const isYesterday = (date) => {
  const startOfYesterday = moment().add(-1, 'days').startOf('day').valueOf();
  const startOfDate = moment(date).startOf('day').valueOf();
  return moment(startOfYesterday).isSame(startOfDate);
};

// returns a date's day of week
export const getDayOfWeek = (date) => moment(date).format('dddd');

// returns a list of the last seven days
export const getLastSevenDays = () => {
  const days = [];
  for (let i = 0; i < 7; i += 1) {
    days.push(moment().subtract(i, 'days').format('dddd'));
  }
  return days;
};
