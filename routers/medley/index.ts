// @ts-ignore
import Router from '@medley/router';
import type { Exports, Store } from '../../src/types';

const router = new Router(), staticMap: Record<string, Store> = {};

export default {
    register(...args) {
        if (args[0].includes(':') || args[0].endsWith('*'))
            router.register(args[0]).value = args[1];
        else
            staticMap[args[0]] = args[1];
    },
    build() {
        return c => {
            const staticMatch = staticMap[c.url];
            if (typeof staticMatch === 'undefined') {
                const dynamicMatch = router.find(c.url);
                return dynamicMatch === null ? null : dynamicMatch.store.value;
            }
            return staticMatch;
        }
    }
} as Exports;
