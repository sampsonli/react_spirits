
import {combineReducers} from 'redux';
let _store = undefined;
let _asyncReducers = undefined;

declare const module;


interface Model<T, S>  {
    ns: string,
    state: S,
    actions: T,
    mutations: {
        [propName: string]: (state: S, payload: any) => any
    },
}
interface Actions {
    [propName:string]: (this: {
        commit: any,
        dispatch: any,
        state: object,
        rootState: object
    }, payload: any) => any
}
export function connect<T extends Actions | object, K extends object>(model: Model<T, K>): T {
    if(_store) {
        const injectReducer = (key, reducer) => {
            _asyncReducers[key] = reducer;
            _store.replaceReducer(combineReducers({
                ..._asyncReducers,
            }));
        };
        if (!model.ns || !model.mutations || !model.actions) {
            throw new Error('model 不符合规范，至少需要包含ns,mutations,actions 字段');
        }
        if (_asyncReducers[model.ns] && !module.hot) {
            console.error('模块命名重复，可能会引发未知错误');
        }
        const mutations = {};
        Object.keys(model.mutations).forEach((key) => {
            mutations[`${model.ns}@${key}`] = model.mutations[key];
        });
        const reducer = (state = model.state || {}, {type, payload}) => {
            if (mutations[type]) {
                const curr = {...state};
                return mutations[type](curr, payload) || curr;
            }
            return state;
        };
        injectReducer(model.ns, reducer);
        const actions = {...model.actions, ns: model.ns};
        Object.keys(model.actions).forEach((key) => {
            const originFn = model.actions[key];
            actions[key] = (payload, test) => {
                if (test) {
                    throw new Error('参数传递错误， 不能传多个参数， 建议全部参数放入第一个参数中');
                }
                const state = _store.getState();
                const avatar = {
                    state: state[model.ns],
                    rootState: state,
                    commit: (mt, pd) => {
                        if (model.mutations[mt]) {
                            _store.dispatch({type: `${model.ns}@${mt}`, payload: pd});
                        } else {
                            _store.dispatch({type: mt, payload: pd});
                        }
                    },
                    actions,
                };
                return originFn.bind(avatar)(payload, avatar);
            };
        });
        return actions;
    } else {
        throw new Error('spirits 未初始化, 请先调用 spirits(store)')
    }
}
export default (store, asyncReducers = {}) => {
    _store = store
    _asyncReducers = asyncReducers
};
