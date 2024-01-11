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
        route: ['/user/:name/and/:id', [0, 0, 0]],
        path: '/user/reve/and/0'
    },

    "Wildcards": {
        expect: 4,
        route: ['/info/:project/and/*', [0, 0, 0, 0]],
        path: '/info/stric/and/wildcard'
    }
} as Tests;
