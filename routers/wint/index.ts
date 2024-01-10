import type { Exports, Store } from '../../src/types';
import { Router } from 'wint-js';

// Wint radix router doesn't provide static match by default
const wint = new Router<Store>(), staticMap: Record<string, Store> = {};

wint.options.matchPath = false;
wint.options.pathStart = 1;
wint.options.parsePath = false;

export default {
    register: (...args) => {
        if (args[0].includes(':') || args[0].endsWith('*'))
            wint.put(args);
        else
            staticMap[args[0]] = args[1];
    },
    build: () => {
        const f = wint.build().find;

        return c => {
            const staticMatch = staticMap[c.url];
            return typeof staticMatch === 'undefined' ? f(c) : staticMatch;
        }
    }
} as Exports;
