import type { Expect, Store } from './types';

export default (expect: Expect, result: Store) =>
    result ? (expect - 1) in result : expect === 0;
