import expect from 'expect';
import dayjs from 'dayjs';
import FakeTimers from '@sinonjs/fake-timers';
import {
  isToday,
  isYesterday,
  getDayOfWeek,
  getLastSevenDays,
} from '../helpers/day-helpers';

describe('day helper functions', () => {
  // set NOW to be the first millisecond of Wednesday, January 1, 2020 12:00:00 AM
  // this is an abitrary date but using the first millisecond of a day makes it easier to
  // calculate what our fn return values should equal
  const NOW = 1577854800000;

  let clock;
  let date;

  beforeEach(() => {
    clock = FakeTimers.install({ now: NOW });
  });

  afterEach(() => {
    clock.reset();
  });

  it('should return true if given date is today', () => {
    date = dayjs();
    expect(isToday(date.$d)).toBeTruthy();
  });

  it('should return false if given date is not today', () => {
    date = dayjs(new Date(2019, 11, 30));
    expect(isToday(date.$d)).toBeFalsy();
  });

  it('should return true if given date is yesterday', () => {
    date = dayjs(new Date(2019, 11, 31));
    expect(isYesterday(date.$d)).toBeTruthy();
  });

  it('should return false if given date is not yesterday', () => {
    date = dayjs(new Date(2019, 11, 30));
    expect(isYesterday(date.$d)).toBeFalsy();
  });

  it('should return the correct day of the week for a given date', () => {
    date = dayjs();
    expect(getDayOfWeek(date.$d)).toEqual('Wednesday');
  });

  it('should return an array of the previous seven days (including the current day)', () => {
    expect(getLastSevenDays()).toEqual(['Wednesday', 'Tuesday', 'Monday', 'Sunday', 'Saturday', 'Friday', 'Thursday']);
  });
});
