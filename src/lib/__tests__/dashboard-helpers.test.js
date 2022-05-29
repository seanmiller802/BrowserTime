import expect from 'expect';
import { DASHBOARD_DATA_MOCK } from '../test-mocks/mocks';
import { getDashboardData, formatTime } from "../helpers/dashboard-helpers";

describe('dashboard helper functions', () => {

    // it('should return the sessions sorted by date', () => {
    //     const result = getDashboardData();
    //     expect(result).toEqual(DASHBOARD_DATA_MOCK);
    // });
    
    describe('formatTime helper', () => {

        it('should handle a perfectly even # of hours', () => {
            const threeHours = 10800000;
            const result = formatTime(threeHours);
            expect(result).toEqual('3 hours ');
        });

        it('should handle hours and minutes', () => {
            const threeHours10Minutes = 11400000;
            const result = formatTime(threeHours10Minutes);
            expect(result).toEqual('3 hours 10 minutes');
        });

        it('should handle less than an hour', () => {
            const tenMinutes = 600000;
            const result = formatTime(tenMinutes);
            expect(result).toEqual('10 minutes');
        });

        it('should handle less than an hour', () => {
            const lessThan1Minute = 1;
            const result = formatTime(lessThan1Minute);
            expect(result).toEqual('0 minutes');
        });
    })
});
