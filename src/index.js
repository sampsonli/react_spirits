
import {combineReducers} from 'redux';
let _store = undefined;
export const connect = (model) => {
    if(_store) {
        return _store.connect(model)
    } else {
        throw new Error('spirits 未初始化, 请先调用 spirits(store)')
    }
}
export default (store, asyncReducers = {}) => {
    const injectReducer = (key, reducer) => {
        asyncReducers[key] = reducer;
        store.replaceReducer(combineReducers({
            ...asyncReducers,
        }));
    };

    store.connect = (model) => {
        if (!model.ns || !model.mutations || !model.actions) {
            console.error('model 不符合规范，至少需要包含ns,mutations,actions 字段');
            return;
        }
        if (asyncReducers[model.ns] && !module.hot) {
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
        const actions = {ns: model.ns};
        Object.keys(model.actions).forEach((key) => {
            const originFn = model.actions[key];
            actions[key] = (payload, test) => {
                if (test) {
                    throw new Error('参数传递错误， 不能传多个参数， 建议全部参数放入第一个参数中');
                }
                const state = store.getState();
                const avatar = {
                    state: state[model.ns],
                    rootState: state,
                    commit: (mt, pd) => {
                        if (model.mutations[mt]) {
                            store.dispatch({type: `${model.ns}@${mt}`, payload: pd});
                        } else {
                            store.dispatch({type: mt, payload: pd});
                        }
                    },
                    actions,
                };
                return originFn.bind(avatar)(payload, avatar);
            };
        });
        return actions; // eslint-disable-line
    };
    _store = store
};
