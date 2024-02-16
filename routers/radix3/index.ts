import { createRouter } from 'radix3';
import type { Exports, Store } from '../../src/types';

const routes: Record<string, Store> = {};

export default {
    register: (...args) => {
        routes[args[0]] = args[1];
    },

    build: () => {
        const router = createRouter({ routes });
        return c => router.lookup(c.path);
    }
} as Exports;
