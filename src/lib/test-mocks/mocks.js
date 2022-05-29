export const RAW_SESSION_DATA_MOCK = {
    'wsj.com': {
        sessions: [
            { start: 1608955631135, end: 1608956631135, validUntil: 1612760399999, origin: 'https://www.wsj.com' },
            { start: 1609024093220, end: 1609026093224, validUntil: 1612846799999, origin: 'https://www.wsj.com' },
            { start: 1609130641566, end: 1609130841566, validUntil: 1612933199999, origin: 'https://www.wsj.com' },
            { start: 1609130641568, end: 1609130851566, validUntil: 1612933199999, origin: 'https://www.wsj.com' },
            { start: 1609130641568, end: 1609130851566, validUntil: 1412933199999, origin: 'https://www.wsj.com' }
        ]
    },
    'duckduckgo.com': {
        sessions: [
            { start: 1609130641568, end: 1609130851566, validUntil: 1412933199999, origin: 'https://duckduckgo.com' },
            { start: 1608955631134, end: 1608956631136, validUntil: 1612760399999, origin: 'https://duckduckgo.com' },
            { start: 1609024093221, end: 1609026093224, validUntil: 1612846799999, origin: 'https://duckduckgo.com' },
            { start: 1609130641567, end: 1609130841570, validUntil: 1612933199999, origin: 'https://duckduckgo.com' }
        ]
    },
    'github.com': {
        sessions: [
            { start: 1608955631133, end: 1608956631137, validUntil: 1612760399999, origin: 'https://github.com' },
            { start: 1609024093222, end: 1609026093223, validUntil: 1612846799999, origin: 'https://github.com' },
            { start: 1609130641568, end: 1609130851566, validUntil: 1412933199999, origin: 'https://github.com' },
            { start: 1609130641568, end: 1609130841568, validUntil: 1612933199999, origin: 'https://github.com' }
        ]
    },
    'netflix.com': {
        sessions: [
            { start: 1608955631135, end: 1608956631135, validUntil: 1612760399999, origin: 'https://www.netflix.com' },
            { start: 1609024093220, end: 1609026093224, validUntil: 1612846799999, origin: 'https://www.netflix.com' },
            { start: 1609130641566, end: 1609130841566, validUntil: 1612933199999, origin: 'https://www.netflix.com' },
            { start: 1609130641568, end: 1609130851566, validUntil: 1612933199999, origin: 'https://www.netflix.com' },
            { start: 1609130641568, end: 1609130851566, validUntil: 1412933199999, origin: 'https://www.netflix.com' },
            { start: 1608955631135, end: 1608956631135, validUntil: 1612760399999, origin: 'https://www.netflix.com' },
            { start: 1609024093220, end: 1609026093224, validUntil: 1612846799999, origin: 'https://www.netflix.com' },
            { start: 1609130641566, end: 1609130841566, validUntil: 1612933199999, origin: 'https://www.netflix.com' },
            { start: 1609130641568, end: 1609130851566, validUntil: 1612933199999, origin: 'https://www.netflix.com' },
            { start: 1609130641568, end: 1609130851566, validUntil: 1412933199999, origin: 'https://www.netflix.com' }
        ]
    },
    'chase.com': {
        sessions: [
            { start: 1609130641568, end: 1609130851566, validUntil: 1412933199999, origin: 'https://www.chase.com' },
            { start: 1608955631134, end: 1608956631136, validUntil: 1612760399999, origin: 'https://www.chase.com' },
            { start: 1609024093221, end: 1609026093224, validUntil: 1612846799999, origin: 'https://www.chase.com' },
        ]
    },
    'amazon.com': {
        sessions: [
            { start: 1608955631133, end: 1608956631137, validUntil: 1612760399999, origin: 'https://www.amazon.com' },
            { start: 1609024093222, end: 1609026093223, validUntil: 1612846799999, origin: 'https://www.amazon.com' },
            { start: 1608955631133, end: 1608956631137, validUntil: 1612760399999, origin: 'https://www.amazon.com' },
            { start: 1609024093222, end: 1609026093223, validUntil: 1612846799999, origin: 'https://www.amazon.com' },
            { start: 1608955631133, end: 1608956631137, validUntil: 1612760399999, origin: 'https://www.amazon.com' },
            { start: 1609024093222, end: 1609026093223, validUntil: 1612846799999, origin: 'https://www.amazon.com' },
            { start: 1608955631133, end: 1608956631137, validUntil: 1612760399999, origin: 'https://www.amazon.com' },
        ]
    },
    'reddit.com': {
        sessions: [
            { start: 1609130641568, end: 1609130851566, validUntil: 1412933199999, origin: 'https://www.reddit.com' }
        ]
    }
};

export const DASHBOARD_DATA_MOCK = [
    {
        date: "Fri, 25 Dec 2020 05:00:00 GMT",
        total: 3000006,
        categories: [
            { title: 'Other', time: 1000004 },
            { title: 'Search_Engines', time: 1000002 },
            { title: 'News', time: 1000000 }
        ],
        sites: [
            {
                title: 'github.com',
                category: 'Other',
                total: 1000004,
                sessions: [{ start: 1608955631133, end: 1608956631137 }]
            },
            {
                title: 'duckduckgo.com',
                category: 'Search_Engines',
                total: 1000002,
                sessions: [{ start: 1608955631134, end: 1608956631136 }]
            },
            {
                title: 'wsj.com',
                category: 'News',
                total: 1000000,
                sessions: [{ start: 1608955631135, end: 1608956631135 }]
            }
        ]
    },
    {
        date: "Sat, 26 Dec 2020 05:00:00 GMT",
        total: 6000008,
        categories: [
            { title: 'News', time: 2000004 },
            { title: 'Search_Engines', time: 2000003 },
            { title: 'Other', time: 2000001 }
        ],
        sites: [
            {
                title: 'wsj.com',
                category: 'News',
                total: 2000004,
                sessions: [{ start: 1609024093220, end: 1609026093224 }]
            },
            {
                title: 'duckduckgo.com',
                category: 'Search_Engines',
                total: 2000003,
                sessions: [{ start: 1609024093221, end: 1609026093224 }]
            },
            {
                title: 'github.com',
                category: 'Other',
                total: 2000001,
                sessions: [{ start: 1609024093222, end: 1609026093223 }]
            }
        ],
    },
    {
        date: "Sun, 27 Dec 2020 05:00:00 GMT",
        total: 810001,
        categories: [
            { title: 'News', time: 409998 },
            { title: 'Search_Engines', time: 200003 },
            { title: 'Other', time: 200000 }
        ],
        sites: [
            {
                title: 'wsj.com',
                category: 'News',
                total: 409998,
                sessions: [{ start: 1609130641566, end: 1609130841566 }, { start: 1609130641568, end: 1609130851566 }]
            },
            {
                title: 'duckduckgo.com',
                category: 'Search_Engines',
                total: 200003,
                sessions: [{ start: 1609130641567, end: 1609130841570 }]
            },
            {
                title: 'github.com',
                category: 'Other',
                total: 200000,
                sessions: [{ start: 1609130641568, end: 1609130841568 }]
            }
        ]
    }
];