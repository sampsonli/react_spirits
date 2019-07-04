interface Context {
    commit: (mName: string, payload?: any) => any;
    dispatch: (actionType: string, payload?: any) => any;
    state: object;
    rootState: object;
}
interface Act {
    [fname: string]: (this: Context, payload?: any, context?: Context) => any;
}
interface Mt<S> {
    [fname: string]: (this: S, payload?: object, state?: S) => any;
}
export declare function connect<S extends object, M extends Mt<S>, A extends Act>(model: {
    ns: string;
    act: A;
    mt: M;
    state: S;
}): {
    ns: string;
    act: A;
    mt: M;
};
declare const _default: (store: any, asyncReducers?: {}) => void;
export default _default;
