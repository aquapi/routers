import type { Exports } from '../../src/types';
import Wint from 'wint-js/turbo';

const wint = new Wint<number>();

wint.radixOptions.matchPath = false;
wint.radixOptions.pathStart = 1;
wint.radixOptions.parsePath = false;

export default {
    register: (...args) => wint.put(...args),
    build: () => {
        const f = wint.build().find;
        console.log(wint.matchers['PUT'][1].toString());
        return f;
    }
} as Exports;
