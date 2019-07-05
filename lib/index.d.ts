interface Context<M> {
    commit: (mName: keyof M, payload?: any) => any;
    dispatch: (actionType: string, payload?: any) => any;
    state: object;
    rootState: object;
}
interface Act<M> {
    [fname: string]: (this: Context<M>, payload?: any, context?: Context<M>) => any;
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
export declare function connect<S extends object, N extends string>(model: {
    ns: N;
    act: Act<Mt<S>>;
    mt: Mt<S>;
    state: S;
}): {
    act: OAct<Act<Mt<S>>>;
    mt: OMt<Mt<S>>;
    ns: N;
};
declare const _default: (store: any, asyncReducers?: {}) => void;
export default _default;
