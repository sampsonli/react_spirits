interface Context {
    commit: (mName: string, payload?: any) => any;
    dispatch: (actionType: string, payload?: any) => any;
    state: object;
    rootState: object;
}
interface Act {
    [fname: string]: (this: Context | Act, payload?: any, context?: Context) => any;
}
interface Mt<S> {
    [fname: string]: (this: S | Mt<S>, payload?: any, state?: S) => any;
}
declare type OAct<A> = {
    [act in keyof A]: A[act];
};
declare type OMt<M> = {
    [mt in keyof M]: M[mt];
};
export declare function connect<S extends object, M extends Mt<S>, A extends Act>(model: {
    ns: string;
    act: A;
    mt: M;
    state: S;
}): {
    act: OAct<A>;
    mt: OMt<M>;
    ns: string;
};
declare const _default: (store: any, asyncReducers?: {}) => void;
export default _default;
