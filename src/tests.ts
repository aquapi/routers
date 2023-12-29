import type { Tests } from './types';

export default {
    "Root path": {
        expect: 1,
        route: ['GET', '/', 1]
    },

    "Long path": {
        expect: 2,
        route: ['POST', '/areally/long/path/actually', 2]
    },

    "URL params": {
        expect: 3,
        route: ['PUT', '/user/:name', 3],
        path: '/user/reve'
    },

    "Wildcards": {
        expect: 4,
        route: ['GET', '/wildcard/and/sth/else/*', 4],
        path: '/wildcard/and/sth/else/90'
    }
} as Tests;
