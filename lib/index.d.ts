interface Model<T, S> {
    ns: string;
    state: S;
    actions: T;
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
export declare function connect<T extends Actions | object, K extends object>(model: Model<T, K>): T;
declare const _default: (store: any, asyncReducers?: {}) => void;
export default _default;
