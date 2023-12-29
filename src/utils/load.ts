import type { Exports, Package, State } from '../types';

const getDefault = (d: any) => d.default;

export default async (dir: string, state: State) => {
    const d = await import(dir + '/package.json').then(getDefault) as Package;
    for (var key in d.dependencies)
        state.dependencies[key] = d.dependencies[key];

    const source = await import(dir + '/index.ts').then(getDefault) as Exports;
    state.frameworks[d.name] = source;
}
