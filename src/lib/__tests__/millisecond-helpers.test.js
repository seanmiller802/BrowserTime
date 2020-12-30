import expect from 'expect';
import dayjs from 'dayjs';
import FakeTimers from '@sinonjs/fake-timers';
import {
  getLastHour,
  getLastSeven,
  getLastFourteen,
  getLastThirty,
  getToday,
  getYesterday,
  getCustom,
  getStartOfDay,
} from '../helpers/millisecond-helpers';

describe('millisecond helper functions', () => {
  // set NOW to be the first millisecond of Wednesday, January 1, 2020 12:00:00 AM
  // this is an arbitrary date but using the first millisecond of a day makes it easier to
  // calculate what our fn return values should equal
  const NOW = 1577854800000;

  const MILLISECONDS_PER_HOUR = 1000 * 60 * 60;
  const MILLISECONDS_PER_DAY = MILLISECONDS_PER_HOUR * 24;

  let clock;

  beforeEach(() => {
    clock = FakeTimers.install({ now: NOW });
  });

  afterEach(() => {
    clock.reset();
  });

  it('should return the correct millisecond from exactly 60 minutes ago', () => {
    const millisecond = getLastHour();
    expect(millisecond).toEqual(clock.now - MILLISECONDS_PER_HOUR);
  });

  it('should return the correct first millisecond of the current day', () => {
    const millisecond = getToday();
    expect(millisecond).toEqual(clock.now);
  });

  it('should return the correct first and last millisecond of the previous day', () => {
    const { start, end } = getYesterday();
    expect(start).toEqual(clock.now - (MILLISECONDS_PER_DAY));
    expect(end).toEqual(clock.now - 1);
  });

  it('should return the correct first millisecond of the last 7 days (including current day)', () => {
    const millisecond = getLastSeven();
    expect(millisecond).toEqual(clock.now - (MILLISECONDS_PER_DAY * 6));
  });

  it('should return the correct first millisecond of the last 14 days (including current day)', () => {
    const millisecond = getLastFourteen();
    expect(millisecond).toEqual(clock.now - (MILLISECONDS_PER_DAY * 13));
  });

  it('should return the correct first millisecond of the last 30 days (including current day)', () => {
    const millisecond = getLastThirty();
    expect(millisecond).toEqual(clock.now - (MILLISECONDS_PER_DAY * 29));
  });

  it('should return the correct first and last millisecond of a custom date range', () => {
    const startDate = dayjs(new Date(2019, 11, 30));
    const endDate = dayjs(new Date(2019, 11, 31));
    const { start, end } = getCustom(startDate.$d, endDate.$d);
    expect(start).toEqual(clock.now - (MILLISECONDS_PER_DAY * 2));
    expect(end).toEqual(clock.now - 1);
  });

  it('should return the correct first millisecond of a given date', () => {
    const date = dayjs(new Date(2019, 11, 31));
    const millisecond = getStartOfDay(date.$d);
    expect(millisecond).toEqual(clock.now - MILLISECONDS_PER_DAY);
  });
});
