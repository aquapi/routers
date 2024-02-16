import type { Exports, Store } from '../../src/types';
import { internal } from '@bit-js/blitz';

const blitz = new internal.Radix<Store>();

export default {
    register: (...args) => blitz.put(...args),
    build: () => blitz.buildMatcher({}, null),
    normalizePath: path => path.substring(1)
} as Exports;
