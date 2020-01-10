interface Context {
    commit: (mName: string, payload?: any) => any;
    dispatch: (actionType: string, payload?: any) => any;
    state: object;
    rootState: object;
}
interface Act {
    [fname: string]: (this: Context | any, payload?: any, context?: Context) => any;
}
interface Mt<S> {
    [fname: string]: (this: S, payload?: any, state?: S) => any;
}
declare type OAct<A> = {
    [act in keyof A]: (payload?: any) => any;
};
declare type OMt<M> = {
    [mt in keyof M]: (payload?: any) => any;
};
export declare function connect<S extends object, M extends Mt<S>, A extends Act, N extends string>(model: {
    ns: N;
    act: A;
    mt: M;
    state: S;
}): {
    act: OAct<A>;
    mt: OMt<M>;
    ns: N;
};
declare const _default: (store: any, asyncReducers?: {}) => void;
export default _default;
