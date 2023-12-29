import type { Tests } from './types';

export default {
    "Root path": {
        expect: 1,
        route: ['GET', '/', 1]
    },

    "Long path": {
        expect: 2,
        route: ['POST', '/areallylongpath', 2]
    },

    "URL params": {
        expect: 3,
        route: ['PUT', '/user/id/:id', 3],
        path: '/user/id/90'
    },

    "Wildcards": {
        expect: 4,
        route: ['GET', '/wild/*', 4],
        path: '/wild/90'
    }
} as Tests;
