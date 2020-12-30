import dayjs from 'dayjs';

/** @module day-helpers */

/**
 * @function isToday - Returns if a date is today.
 * @param {object} date a datejs date object
 * @returns {bool}
 */
export const isToday = (date) => {
  const today = dayjs().startOf('day').valueOf();
  const other = dayjs(date).startOf('day').valueOf();
  return dayjs(today).isSame(other);
};

/**
 * @function isYesterday - Returns if a date is yesterday.
 * @param {object} date a datejs date object
 * @returns {bool}
 */
export const isYesterday = (date) => {
  const startOfYesterday = dayjs().add(-1, 'days').startOf('day').valueOf();
  const startOfDate = dayjs(date).startOf('day').valueOf();
  return dayjs(startOfYesterday).isSame(startOfDate);
};

/**
 * @function getDayOfWeek - Returns the day of the week for a given date.
 * @param {object} date a datejs date object
 * @returns {string}
 */
export const getDayOfWeek = (date) => dayjs(date).format('dddd');

/**
 * @function getLastSevenDays - Returns a list of the last 7 days (including current day).
 * @param {object} date a datejs date object
 * @returns {Array<string>}
 */
export const getLastSevenDays = () => {
  const days = [];
  for (let i = 0; i < 7; i += 1) {
    days.push(dayjs().subtract(i, 'days').format('dddd'));
  }
  return days;
};
