interface T extends Object {
}
interface R<N> extends T {
    ns: N;
}
export declare function connect<N>(ns: N): (clazz: T) => () => R<N>;
export declare function action(clazz: any, act: any): any;
declare const _default: (store: any, asyncReducers?: {}) => void;
export default _default;
