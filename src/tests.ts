import type { Tests } from './types';

export default {
    "Simple URL params": {
        expect: 1,
        route: ['/params/:id', [0]],
        path: '/params/90'
    },

    "URL params": {
        expect: 2,
        route: ['/user/:name/:id', [0, 0]],
        path: '/user/reve/90'
    },

    "Wildcards": {
        expect: 3,
        route: ['/info/:project/and/*', [0, 0, 0]],
        path: '/info/stric/and/wildcard'
    },

    "Complex wildcards": {
        expect: 4,
        route: ['/info/:project/:id/*', [0, 0, 0, 0]],
        path: '/info/stric/0/wildcard'
    }
} as Tests;
