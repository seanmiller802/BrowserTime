import dayjs from 'dayjs';
import { RAW_SESSION_DATA_MOCK } from '../test-mocks/mocks';
import categoryMappings from '../mappings/categoryMappings';
import { getCategory } from './history-helpers';

/** @module dashboard-helpers */

// 1. get session data from local storage
// 2. remove any invalid sessions
// 3. rewrite the valid sessions to local storage
// 4. return valid sessions
const getSessions = () => {
    var sessions = JSON.parse(localStorage.getItem('sessions'));
    console.log('getSessions()', sessions);

    // create sessions item in local storage if it isn't there for some reason
    if (!sessions) {
        // console.error('No sessions object available in local storage.');
        localStorage.setItem('sessions', JSON.stringify({}));
        return {};
    }

    const now = Date.now();

    if (Object.keys(sessions).length > 0) {
        Object.keys(sessions).forEach((key) => {
            sessions[key].sessions.forEach((session, index) => {
                if (now > session.validUntil) {
                    sessions[key].sessions.splice(index, 1);
                    if (sessions[key].sessions.length < 1) {
                        delete sessions[key];
                    }
                }
            });
        });
        localStorage.setItem('sessions', JSON.stringify(sessions));
    }
    
    return sessions;
}

/**
 * @function getDashboardData - Returns an array of days in ascending order
 * @returns {array}
 */
export const getDashboardData = () => {

    localStorage.setItem('sessions', JSON.stringify(RAW_SESSION_DATA_MOCK));

    const sessions = getSessions();
    console.log('getDashboardData() sessions', sessions);

    let data = {};
    let result = [];

    // group session data by date
    if (Object.keys(sessions).length > 0) {
        Object.keys(sessions).forEach((key) => {
            sessions[key].sessions.forEach((session) => {
                const sessionTime = session.end - session.start;
                const date = dayjs(session.start).startOf('day');
                const category = categoryMappings.find(item => item.key === getCategory(key)).name;
                if (!data[date]) {
                    data[date] = {
                        total: sessionTime,
                        sites: {
                            [key]: {
                                category,
                                total: sessionTime,
                                sessions: [],
                                origin: session.origin
                            }
                        },
                        categories: {
                            [category]: sessionTime
                        }
                    };
                    data[date].sites[key].sessions.push({ start: session.start, end: session.end });
                } else {
                    data[date].total += sessionTime;
                    
                    if (!data[date].sites[key]) {
                        data[date].sites[key] = { sessions: [], total: sessionTime, category, origin: session.origin };
                    } else {
                        data[date].sites[key].total += sessionTime;
                    }
                    data[date].sites[key].sessions.push({ start: session.start, end: session.end }); 
                    
                    if (!data[date].categories[category]) {
                        data[date].categories[category] = sessionTime;
                    } else {
                        data[date].categories[category] += sessionTime;
                    }   
                }
            });
        });
    }

    console.log('getDashboardData() data', data);
    if (Object.keys(data).length > 0) {
        console.log('getDashboardData 2')
        Object.keys(data).forEach((day) => {
            // sort the categories in descending order
            let categories = [];
            Object.keys(data[day].categories).forEach((category) => {
                categories.push({ title: category, time: data[day].categories[category] })
            });
            categories.sort((a,b) => b.time - a.time);
            data[day].categories = categories;
    
            // sort the top sites in descending order
            let sites = [];
            Object.keys(data[day].sites).forEach((site) => {
                sites.push({ title: site, ...data[day].sites[site] })
            });
            sites.sort((a,b) => b.total - a.total);
            data[day].sites = sites;
    
            // add the day to results list
            result.push({ date: day, ...data[day] });
        });
    
        // sort by date in ascending order 
        result.sort((a,b) => dayjs(a.date).startOf('day').valueOf() - dayjs(b.date).startOf('day').valueOf());
    }
    
    console.log("FINAL RESULT", result);
    return result;
}

/**
 * @function formatTime - Returns a string with the number of hours and minutes
 * @param {number} ms the amount of milliseconds
 * @returns {number}
 */
export const formatTime = (ms) => {
    const MILLISECONDS_PER_MINUTE = 1000 * 60;
    const MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * 60;

    let hours = Math.floor(ms / MILLISECONDS_PER_HOUR);
    let minutes = Math.floor((ms % MILLISECONDS_PER_HOUR) / MILLISECONDS_PER_MINUTE);

    let str = '';

    if (hours > 0) str += `${hours} hours `;
    if (minutes > 0) str +=  `${minutes} minutes`
    if (hours <= 0 && minutes <= 0) str = '0 minutes';

    return str;
}