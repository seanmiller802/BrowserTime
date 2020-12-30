import dayjs from 'dayjs';

/** @module millisecond-helpers */

const MILLISECONDS_PER_HOUR = 1000 * 60 * 60;
const MILLISECONDS_PER_DAY = MILLISECONDS_PER_HOUR * 24;

/**
 * @function getLastHour - Returns a Unix Timestamp (milliseconds) from 1 hour in the past.
 * @returns {number}
 */
export const getLastHour = () => dayjs().valueOf() - MILLISECONDS_PER_HOUR;

/**
 * @function getToday - Returns a Unix Timestamp (milliseconds) for the start of the current day.
 * @returns {number}
 */
export const getToday = () => dayjs().startOf('day').valueOf();

/**
 * @function getYesterday - Returns an object with two Unix Timestamps (milliseconds) for the start and end of the previous day.
 * @returns {object}
 */
export const getYesterday = () => {
  const start = dayjs().subtract(1, 'day').startOf('day').valueOf();
  const end = dayjs().subtract(1, 'day').endOf('day').valueOf();

  return {
    start,
    end,
  };
};

/**
 * @function getLastSeven - Returns a Unix Timestamp (milliseconds) for the beginning of the day, 7 days in the past (including current day).
 * @returns {number}
 */
export const getLastSeven = () => dayjs().startOf('day').valueOf() - (MILLISECONDS_PER_DAY * 6);

/**
 * @function getLastFourteen - Returns a Unix Timestamp (milliseconds) for the beginning of the day, 14 days in the past (including current day).
 * @returns {number}
 */
export const getLastFourteen = () => dayjs().startOf('day').valueOf() - (MILLISECONDS_PER_DAY * 13);

/**
 * @function getLastThirty - Returns a Unix Timestamp (milliseconds) for the beginning of the day, 30 days in the past (including current day).
 * @returns {number}
 */
export const getLastThirty = () => dayjs().startOf('day').valueOf() - (MILLISECONDS_PER_DAY * 29);

/**
 * @function getCustom - Returns an object with two Unix Timestamps (milliseconds) for the start and end of a custom date range.
 * @param {object} startDate a datejs date object
 * @param {object} endDate a datejs date object
 * @returns {object}
 */
export const getCustom = (startDate, endDate) => {
  const start = dayjs(startDate).startOf('day').valueOf();
  const end = dayjs(endDate).endOf('day').valueOf();
  return { start, end };
};

/**
 * @function getStartOfDay - Returns a Unix Timestamp (milliseconds) for the beginning of a given date.
 * @param {object} date a dayjs date object
 * @returns {number}
 */
export const getStartOfDay = (date) => dayjs(date).startOf('day').valueOf();
