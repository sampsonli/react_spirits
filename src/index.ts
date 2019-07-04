
import {combineReducers} from 'redux';
let _store = undefined;
let _asyncReducers = undefined;

declare const module;

interface Context {
    commit: (mName: string, payload?: any) => any;
    dispatch: (actionType: string, payload?: any) => any;
    state: object
    rootState: object,
}
interface Act {
    [fname: string]: (this: Context, payload?: any, context?: Context) => any;
}
interface Mt<S> {
    [fname: string]: (this: S, payload?: object, state?: S) => any;
}

export function connect<S extends object, M extends Mt<S>, A extends Act>(model: {
    ns: string,
    act: A,
    mt: M,
    state: S
}): {act: A, mt: M, ns: string} {
    if(_store) {
        const injectReducer = (key, reducer) => {
            _asyncReducers[key] = reducer;
            _store.replaceReducer(combineReducers({
                ..._asyncReducers,
            }));
        };
        if (!model.ns || !model.mt || !model.act) {
            throw new Error('model 不符合规范，至少需要包含ns,mt,act 字段');
        }
        if (_asyncReducers[model.ns] && !module.hot) {
            console.error('模块命名重复，可能会引发未知错误');
        }
        const mutations = {};
        const mt = {} as M;
        Object.keys(model.mt).forEach((key) => {
            mutations[`${model.ns}@${key}`] = model.mt[key];
            //@ts-ignore
            mt[key] = (payload) => _store.dispatch({type: mt, payload});
        });
        const reducer = (state = model.state || {}, {type, payload}) => {
            if (mutations[type]) {
                const curr = {...state};
                return mutations[type].bind(curr)(payload, curr) || curr;
            }
            return state;
        };
        injectReducer(model.ns, reducer);
        const actions = {...model.act} as A;
        Object.keys(model.act).forEach((key) => {
            const originFn = model.act[key];
            //@ts-ignore
            actions[key] = (payload, test) => {
                if (test) {
                    throw new Error('参数传递错误， 不能传多个参数， 建议全部参数放入第一个参数中');
                }
                const state = _store.getState();
                const avatar = {
                    state: state[model.ns],
                    rootState: state,
                    commit: (mt, pd) => {
                        if (model.mt[mt]) {
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
        return {ns: model.ns, act: actions, mt};
    } else {
        throw new Error('spirits 未初始化, 请先调用 spirits(store)')
    }
}
export default (store, asyncReducers = {}) => {
    _store = store
    _asyncReducers = asyncReducers
};
