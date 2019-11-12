## react-deliverer react 拯救者
> 基于redux 进一步封装， 更方便使用， 同时结构更清晰
### 优势
1. 模块化
2. 无需定义各种常量
3. 无缝按需加载
4. 使用简单
5. 热加载
6. 维护简单
7. 使用ts开发， 拥有自动代码提示

## 使用方法
1. 安装react-deliverer
~~~bash
yarn add react-deliverer
~~~
2. 获取store
3. 注入deliverer
~~~javascript
import deliverer from 'react-deliverer';
const store = createStore();
deliverer(store, asyncReducers); // asyncReducers是老版本维护的所有reducer， 新开项目可以不用传
~~~
4. 定义model
~~~javascript
import {connect, action} from 'react-deliverer';
// import ajax from '../common/ajax';

@connect('demo')
class Demo {
    newList = null

    abc = 3

    @action
    setNewsLis(list) {
        this.newsList = list;
    }

    @action
    changeAbc(payload) {
        this.abc = payload;
    }

    getAbc(num) {
        this.changeAbc(num);
    }

    getNewList() {
        setTimeout(() => {
            this.setNewsLis([{
                title: 'hello',
            }, {
                title: 'welcome',
            }]);
        }, 1000);
    }
}

export default new Demo();

~~~
5. 使用deliverer
~~~jsx harmony
import React, {Component} from 'react';
import P from 'prop-types';
import {connect} from 'react-redux';

import store from '../../models/test';
import style from './style.less';

export default @connect(state => ({stat: state[store.ns]}))
class ScrollDemo extends Component {
    static propTypes = {
        stat: P.objectOf(P.any).isRequired,
    }

    componentDidMount() {
        store.getNewList();
    }

    changeColor = () => {
        store.getAbc(Math.floor(Math.random() * 1000));
    }

    render() {
        const {stat} = this.props;
        return (
            <div className={`l-full l-flex-column ${style.wrapper}`}>
                <div className={style.header} onClick={this.changeColor}>
                    <span>
                        新闻头条-
                        {stat.abc}
                    </span>
                </div>
                <div className="l-flex-1 l-relative">
                    <div className="l-full" id="wrapper">
                        {stat.newsList
                        && (
                            <ul className={style.list} id="target">
                                {stat.newsList.map(item => (
                                    <li key={item.title} className={style.item}>
                                        <div className={style.title}>
                                            {item.title}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) || <div className="empty l-full l-box-center">加载中...</div>}
                    </div>

                </div>

            </div>
        );
    }
}

~~~
