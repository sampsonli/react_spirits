interface Model<A, S> {
    ns: string;
    state: S;
    actions: A;
    mutations: {
        [propName: string]: (state: S, payload: any) => any;
    };
}
interface Actions {
    [propName: string]: (this: {
        commit: any;
        dispatch: any;
        state: object;
        rootState: object;
    }, payload: any) => any;
}
export declare function connect<A extends Actions | object, S extends object>(model: Model<A, S>): A | {
    ns: string;
};
declare const _default: (store: any, asyncReducers?: {}) => void;
export default _default;
