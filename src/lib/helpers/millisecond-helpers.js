import dayjs from 'dayjs';

const MILLISECONDS_PER_HOUR = 1000 * 60 * 60;
const MILLISECONDS_PER_DAY = MILLISECONDS_PER_HOUR * 24;

// return first millisecond of previous 60 minutes
export const getLastHour = () => dayjs().valueOf() - MILLISECONDS_PER_HOUR;

// return first millisecond of current day
export const getToday = () => dayjs().startOf('day').valueOf();

// return millisecond range of previous day
export const getYesterday = () => {
  const start = dayjs().subtract(1, 'day').startOf('day').valueOf();
  const end = dayjs().subtract(1, 'day').endOf('day').valueOf();

  return {
    start,
    end,
  };
};

// return millisecond range of previous 7 days (including current day)
export const getLastSeven = () => dayjs().startOf('day').valueOf() - (MILLISECONDS_PER_DAY * 6);

// return millisecond range of previous 14 days (including current day)
export const getLastFourteen = () => dayjs().startOf('day').valueOf() - (MILLISECONDS_PER_DAY * 13);

// return millisecond range of previous 30 days (including current day)
export const getLastThirty = () => dayjs().startOf('day').valueOf() - (MILLISECONDS_PER_DAY * 29);

// return millisecond range for custom start and end
export const getCustom = (startDate, endDate) => {
  const start = dayjs(startDate).startOf('day').valueOf();
  const end = dayjs(endDate).endOf('day').valueOf();
  return { start, end };
};

// return starting millisecond of any date
export const getStartOfDay = (date) => dayjs(date).startOf('day').valueOf();
