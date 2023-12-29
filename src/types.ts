export interface Exports {
    register(method: string, path: string, value: number): any;
    build(): (c: Context) => number;
}

export interface State {
    frameworks: Record<string, Exports>;
    dependencies: Record<string, string>;
}

export interface Package {
    dependencies: Record<string, string>;
    name: string;
}

export type Route = [method: string, path: string, value: number];

export interface Test {
    route: Route;

    /**
     * Expected result
     */
    expect: number;

    /**
     * Path to test for dynamic route patterns
     */
    path?: string;
}

export interface Tests extends Record<string, Test> { }

export interface Context {
    url: string,
    method: string;
}
