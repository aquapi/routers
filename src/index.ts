import { bench, group, run } from 'mitata';
import fs from 'fs';
import type { State } from './types';
import pkg from '../package.json';
import load from './utils/load';
import { resolve } from 'path';
import tests from './tests';

const
    routersDir = './routers',
    state: State = {
        frameworks: {},
        dependencies: {}
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

if (process.argv.length > 2) process.exit(0);

{
    // Avoid JIT bias
    let i = 0;

    while (i < 20) {
        bench('noop', () => { });
        ++i;
    }
}

let name: string, label: string;
for (name in state.frameworks) group(name, () => {
    // Register first
    var framework = state.frameworks[name];
    for (label in tests)
        framework.register(...tests[label].route);

    var f = framework.build();

    // Register to mitata
    for (label in tests) {
        const test = tests[label], context = {
            method: test.route[0],
            url: test.path ?? test.route[1]
        };

        // Check
        var result = f(context);
        if (result !== test.expect)
            throw new Error(`Router '${name}' failed '${label}':\n\tExpect: ${test.expect}\n\tActual: ${result}`);

        bench(label, () => f(context));
    }
});

run();
