import { bench, group, run } from 'mitata';
import fs from 'fs';
import type { State } from './types';
import pkg from '../package.json';
import load from './utils/load';
import { resolve } from 'path';
import tests from './tests';
import validate from './validate';

const
    routersDir = './routers',
    state: State = {
        frameworks: {},
        dependencies: {},
        normalizer: {},
        func: {}
    },
    routers = fs.readdirSync(routersDir);

// Load all to state
{
    let routerDir: string;
    for (routerDir of routers)
        await load(resolve(routersDir + '/' + routerDir), state);
}

// Load dependencies to package.json
{
    // @ts-ignore
    pkg.dependencies = state.dependencies;
    await Bun.write('./package.json', JSON.stringify(pkg, null, 4));
    Bun.spawnSync([process.execPath, 'i'], { cwd: process.cwd() });
}

// Install only
if (process.argv[2] === 'install') process.exit(0);

// Avoid JIT bias
for (let i = 0; i < 50; ++i)
    bench('noop', () => { });

// Build
const yieldPath = (path: string) => path;
for (const name in state.frameworks) {
    const framework = state.frameworks[name];
    for (const label in tests)
        framework.register(...tests[label].route);

    state.func[name] = framework.build();
    state.normalizer[name] = framework.normalizePath ?? yieldPath;
}

// Register to mitata
for (const label in tests) group(label, () => {
    const test = tests[label],
        fullPath = test.path ?? test.route[0];

    for (const name in state.frameworks) {
        const f = state.func[name], ctx = {
            path: state.normalizer[name](fullPath)
        };

        // Check
        const result = f(ctx);
        if (!validate(test.expect, result))
            throw new Error(`Router '${name}' failed '${label}':\n\tExpect: ${JSON.stringify(test.expect)}\n\tActual: ${JSON.stringify(result)}`);

        bench(name, () => f(ctx));
    }
});

Bun.gc(true);
Bun.sleepSync(5000);
run();
