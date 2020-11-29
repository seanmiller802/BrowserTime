import dayjs from 'dayjs';

// checks if a date is today
export const isToday = (date) => {
  const today = dayjs().startOf('day').valueOf();
  const other = dayjs(date).startOf('day').valueOf();
  return dayjs(today).isSame(other);
};

// checks if a date is yesterday
export const isYesterday = (date) => {
  const startOfYesterday = dayjs().add(-1, 'days').startOf('day').valueOf();
  const startOfDate = dayjs(date).startOf('day').valueOf();
  return dayjs(startOfYesterday).isSame(startOfDate);
};

// returns a date's day of week
export const getDayOfWeek = (date) => dayjs(date).format('dddd');

// returns a list of the last seven days
export const getLastSevenDays = () => {
  const days = [];
  for (let i = 0; i < 7; i += 1) {
    days.push(dayjs().subtract(i, 'days').format('dddd'));
  }
  return days;
};
