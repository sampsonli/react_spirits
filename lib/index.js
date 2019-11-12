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
function connect(ns) {
    if (_store) {
        var injectReducer_1 = function (key, reducer) {
            _asyncReducers[key] = reducer;
            _store.replaceReducer(redux_1.combineReducers(__assign({}, _asyncReducers)));
        };
        if (_asyncReducers[ns] && !module.hot) {
            console.error('模块命名重复，可能会引发未知错误');
        }
        return function (clazz) {
            return function () {
                // @ts-ignore
                var result = new clazz();
                result.ns = ns;
                // @ts-ignore
                var actions = clazz.prototype.__actions || {};
                var mutations = {};
                Object.keys(actions).forEach(function (func) {
                    mutations[ns + "/" + func] = actions[func];
                });
                var reducer = function (state, _a) {
                    if (state === void 0) { state = result; }
                    var type = _a.type, payload = _a.payload;
                    if (mutations[type]) {
                        var curr = __assign({}, state);
                        return mutations[type].bind(curr)(payload) || curr;
                    }
                    return state;
                };
                injectReducer_1(ns, reducer);
                return result;
            };
        };
    }
    else {
        throw new Error('spirits 未初始化, 请先调用 spirits(store)');
    }
}
exports.connect = connect;
function action(clazz, act) {
    var _a;
    if (clazz.__actions) {
        clazz.__actions[act] = clazz[act];
    }
    else {
        clazz.__actions = (_a = {}, _a[act] = clazz[act], _a);
    }
    clazz[act] = function (payload) {
        _store.dispatch({ type: this.ns + "/" + act, payload: payload });
    };
    return clazz[act];
}
exports.action = action;
exports.default = (function (store, asyncReducers) {
    if (asyncReducers === void 0) { asyncReducers = {}; }
    _store = store;
    _asyncReducers = asyncReducers;
});
//# sourceMappingURL=index.js.map