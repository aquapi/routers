export type Store = number[];
export type Expect = number;

export interface Handler {
    (c: Context): Store;
}

export interface Exports {
    register(...route: Route): any;
    build(): Handler;
    normalizePath?(path: string): string;
}

export interface State {
    frameworks: Record<string, Exports>;
    dependencies: Record<string, string>;
    func: Record<string, Handler>,
    normalizer: Record<string, (path: string) => string>;
}

export interface Package {
    dependencies: Record<string, string>;
    name: string;
}

export type Route = [path: string, value: Store];

export interface Test {
    route: Route;

    /**
     * Expected result (in this case it is array length)
     */
    expect: Expect;

    /**
     * Path to test for dynamic route patterns
     */
    path?: string;
}

export interface Tests extends Record<string, Test> { }

export interface Context {
    path: string;
}
