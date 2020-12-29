import expect from 'expect';
import {
  groupHistoryByDate,
  groupHistoryByHour
} from '../helpers/history-helpers';

describe('history helper functions', () => {

  let historyMock;
  beforeEach(() => {
    historyMock = [
      { lastVisitTime: 1609273471159.333, title: "title 1" },
      { lastVisitTime: 1609208617784.102, title: "title 2" },
      { lastVisitTime: 1609130741566.3818, title: "title 3" },
      { lastVisitTime: 1609026093220.1719, title: "title 4" },
      { lastVisitTime: 1608955631135.531, title: "title 5" },
    ];
  });

  describe('groupHistoryByDate', () => {

    let groupedByDate;
    beforeEach(() => {
      groupedByDate = [
        { date: "Tue, 29 Dec 2020 05:00:00 GMT", items: [{ lastVisitTime: 1609273471159.333, title: "title 1" }] },
        { date: "Mon, 28 Dec 2020 05:00:00 GMT", items: [{ lastVisitTime: 1609208617784.102, title: "title 2" }] },
        { date: "Sun, 27 Dec 2020 05:00:00 GMT", items: [{ lastVisitTime: 1609130741566.3818, title: "title 3" }] },
        { date: "Sat, 26 Dec 2020 05:00:00 GMT", items: [{ lastVisitTime: 1609026093220.1719, title: "title 4" }] },
        { date: "Fri, 25 Dec 2020 05:00:00 GMT", items: [{ lastVisitTime: 1608955631135.531, title: "title 5" }] }
      ];
    });

    it('should return the history grouped by date', () => {
      const result = groupHistoryByDate(historyMock);
      expect(result).toEqual(groupedByDate);
    });

    it('should return an empty array if no history', () => {
      const result = groupHistoryByDate([]);
      expect(result).toEqual([]);
    });
  });

  describe('groupHistoryByHour', () => {

    let groupedByHour;
    beforeEach(() => {
      groupedByHour = [
        { "count": 1, "hour": "3pm" },
        { "count": 1, "hour": "6pm" },
        { "count": 1, "hour": "9pm" },
        { "count": 2, "hour": "11pm" },
      ];
    });

    it('should return the history grouped by hour of the day', () => {
      const result = groupHistoryByHour(historyMock);
      expect(result).toEqual(groupedByHour);
    });

    it('should return an empty array if no history', () => {
      const result = groupHistoryByHour([]);
      expect(result).toEqual([]);
    });
  });
});

