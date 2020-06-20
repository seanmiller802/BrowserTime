import moment from 'moment';

const millisecondsPerHour = 1000 * 60 * 60;
const millisecondsPerDay = millisecondsPerHour * 24;

// return first millisecond of previous 60 minutes
export const getLastHour = () => moment().valueOf() - millisecondsPerHour;

// return first millisecond of current day
export const getToday = () => moment().startOf('day').valueOf();

// return millisecond range of previous day
export const getYesterday = () => {
  const start = moment().add(-1, 'days').startOf('day').valueOf();
  const end = moment().add(-1, 'days').endOf('day').valueOf();

  return {
    start,
    end,
  };
};

// return millisecond range of previous 7 days (including current day)
export const getLastSeven = () => moment().startOf('day').valueOf() - (millisecondsPerDay * 6);

// return millisecond range of previous 14 days (including current day)
export const getLastFourteen = () => moment().startOf('day').valueOf() - (millisecondsPerDay * 13);

// return millisecond range of previous 30 days (including current day)
export const getLastThirty = () => moment().startOf('day').valueOf() - (millisecondsPerDay * 29);

// return millisecond range for custom start and end
export const getCustom = (startDate, endDate) => {
  const start = moment(startDate).startOf('day').valueOf();
  const end = moment(endDate).endOf('day').valueOf();
  return { start, end };
};

// return starting millisecond of any date
export const getStartOfDay = (date) => moment(date).startOf('day').valueOf();
