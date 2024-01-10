import type { Tests } from './types';

export default {
    "Root path": {
        expect: 1,
        route: ['/', [0]]
    },

    "Long path": {
        expect: 2,
        route: ['/areally/long/path/actually', [0, 0]]
    },

    "URL params": {
        expect: 3,
        route: ['/user/:name', [0, 0, 0]],
        path: '/user/reve'
    },

    "Wildcards": {
        expect: 4,
        route: ['/wildcard/and/sth/else/*', [0, 0, 0, 0]],
        path: '/wildcard/and/sth/else/90'
    }
} as Tests;
