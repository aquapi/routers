// @ts-ignore
import Router from '@medley/router';
import type { Exports } from '../../src/types';

const router = new Router();

export default {
    register(...args) {
        router.register(args[0]).value = args[1];
    },
    build() {
        return c => {
            const dynamicMatch = router.find(c.path);
            return dynamicMatch === null ? null : dynamicMatch.store.value;
        }
    }
} as Exports;
