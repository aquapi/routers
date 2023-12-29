import type { Exports } from '../../src/types';
import Wint from 'wint-js/turbo';

const wint = new Wint<number>();
wint.radixOptions.minURLLen = 0;

export default {
    register: (...args) => wint.put(...args),
    build: () => wint.build().find,
} as Exports;
