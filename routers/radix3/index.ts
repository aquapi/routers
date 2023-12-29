import { createRouter } from 'radix3';
import type { Exports } from '../../src/types';

const routes: Record<string, Record<string, number>> = {};

export default {
    register: (method: string, path: string, value: number) => {
        routes[path] ??= {};
        routes[path][method] = value;
    },

    build: () => {
        const router = createRouter({ routes });

        return c => {
            const m = router.lookup(c.url);
            return m === null ? null : (c.method in m ? m[c.method] : null);
        }
    }
} as Exports;
