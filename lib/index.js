"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var _store = undefined;
var _asyncReducers = undefined;
function connect(model) {
    if (_store) {
        var injectReducer = function (key, reducer) {
            _asyncReducers[key] = reducer;
            _store.replaceReducer(redux_1.combineReducers(__assign({}, _asyncReducers)));
        };
        if (!model.ns || !model.mt || !model.act) {
            throw new Error('model 不符合规范，至少需要包含ns,mt,act 字段');
        }
        if (_asyncReducers[model.ns] && !module.hot) {
            console.error('模块命名重复，可能会引发未知错误');
        }
        var mutations_1 = {};
        var mt_1 = {};
        Object.keys(model.mt).forEach(function (key) {
            mutations_1[model.ns + "@" + key] = model.mt[key];
            //@ts-ignore
            mt_1[key] = function (payload) { return _store.dispatch({ type: mt_1, payload: payload }); };
        });
        var reducer = function (state, _a) {
            if (state === void 0) { state = model.state || {}; }
            var type = _a.type, payload = _a.payload;
            if (mutations_1[type]) {
                var curr = __assign({}, state);
                return mutations_1[type].bind(curr)(payload, curr) || curr;
            }
            return state;
        };
        injectReducer(model.ns, reducer);
        var actions_1 = __assign({}, model.act);
        Object.keys(model.act).forEach(function (key) {
            var originFn = model.act[key];
            //@ts-ignore
            actions_1[key] = function (payload, test) {
                if (test) {
                    throw new Error('参数传递错误， 不能传多个参数， 建议全部参数放入第一个参数中');
                }
                var state = _store.getState();
                var avatar = {
                    state: state[model.ns],
                    rootState: state,
                    commit: function (mt, pd) {
                        if (model.mt[mt]) {
                            _store.dispatch({ type: model.ns + "@" + mt, payload: pd });
                        }
                        else {
                            _store.dispatch({ type: mt, payload: pd });
                        }
                    },
                    actions: actions_1,
                };
                return originFn.bind(avatar)(payload, avatar);
            };
        });
        return { ns: model.ns, act: actions_1, mt: mt_1 };
    }
    else {
        throw new Error('spirits 未初始化, 请先调用 spirits(store)');
    }
}
exports.connect = connect;
exports.default = (function (store, asyncReducers) {
    if (asyncReducers === void 0) { asyncReducers = {}; }
    _store = store;
    _asyncReducers = asyncReducers;
});
//# sourceMappingURL=index.js.map