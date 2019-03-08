## react-spirits
> 基于redux 进一步封装， 更方便使用， 同时结构更清晰
### 优势
1. 模块化
2. 无需定义各种常量
3. 无缝按需加载
4. 使用简单
5. 热加载
6. 维护简单

## 使用方法
1. 安装spirits
~~~bash
yarn add react-spirits
~~~
2. 获取store
3. 注入spirits
~~~javascript
import spirits from 'react-spirits';
const store = createStore();
spirits(store, asyncReducers); // asyncReducers是老版本维护的所有reducer， 新开项目可以不用传
~~~
4. 定义model
~~~javascript
import store from '~/store';
const model = {
    ns: 'eval',
    state: {
        newsList: null,
        abc: 123,
    },
    mutations: {
        setNewsList(state, list) {
            state.newsList = list;
        },
        changeAbc(state, payload) {
            state.abc = payload;
        },
    },
    actions: {
        getUserInfo(payload, {commit}) {
            commit('changeAbc', payload);
            //or this.commit('changeAbc', payload);
        },
    },
};
export default store.connect(model);
~~~
5. 使用spirits
~~~jsx harmony
import React, { Component } from 'react';
import P from 'prop-types';
import { connect } from 'react-redux';
import model from '../../models/test';

export default
@connect(state => ({ stat: state[model.ns] }))
class App extends Component {
    static propTypes = {
        stat: P.objectOf(P.any).isRequired,
    }
    changeColor = () => {
        const num = Math.random() * 1000000;
        model.getUserInfo(num);
    }

    render() {
        const {stat} = this.props;
        return (
            <div>
                <div onClick={this.changeColor}>
                    {stat.abc}
                </div>
            </div>
        );
    }
}

~~~
