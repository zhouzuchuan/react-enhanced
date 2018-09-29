# react-enhanced &middot;

[![download](https://img.shields.io/npm/dm/react-enhanced.svg)](https://www.npmjs.com/search?q=react-enhanced)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE)

[![NPM](https://nodei.co/npm/react-enhanced.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-enhanced/)

基于 redux、redux-saga、react-redux、api-manage 的无侵入 react 架构增强器。

## demo

通过专属 CLI 工具生成默认功能目录，点击这里 [react-enhanced-cli](https://github.com/zhouzuchuan/react-enhanced-cli)

## 下载

**npm**

```bash
npm install react-enhanced
```

**yarn**

```bash
yarn add react-enhanced
```

## 设计思想

-   降低 react + redux 开发门槛，以及提高开发效率
-   无侵入使用，对已使用的框架友好，并且维护增加一些辅助开发的功能
-   实现 model 层，方便管理异步操作以及复用

## 使用

### `init`

    增强器的载入入口

-   `warehouse`： <Array|none> 创建仓库，
-   `state`： <Object|none> 默认 state
-   `reducers`： <Object|none> 全局 reducers
-   `effects`： <Array|none> 全局 effects
-   `middlewares`： <Array|none> saga 中间件
-   `requestCallback`：<Function|none> 请求统一回调（只能处理 request 中间层的请求）
-   `requestError`：<Function|none> 请求统一错误处理（只能处理 request 中间层的请求）
-   `resultLimit`：<String|Array|none> 根据返回的数据数据格式，统一自定义返回（只能处理 request 中间层的请求）
-   `loading`：<ReactElement|Array|function|none> 统一处理组件异步加载的动画
-   `apiList`：<Object> 接口服务管理（格式参考[api-manage](https://github.com/zhouzuchuan/api-manage)）

返回个一个 react-redux 封装的 Provider，但是在这之上我们已经许多工作，如 store 的绑定，以及基于 models 层的数据动态加载

```js
import { init } from 'react-enhanced';

const { Provider } = init();

ReactDOM.render(
    <Provider>
        <App />
    </Provider>,
    document.getElementById('root')
);
```

### `Install`

高阶组件，向组件注入方法，如注入 AsyncComponent

#### `AsyncComponent`

用来异步组件以及 model 注册

-   `component`： <Promise|none> 加载组件，
-   `model`： <Promise|Array[Promise]|none> 加载 model，（采用数组的方式可以注册多个 model）
-   `loading`： <ReactElement|none> 组件加载动画

```js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Install } from 'react-enhanced';

@Install(['AsyncComponent'])
export default class App extends Component {
    render() {
        const { AsyncComponent } = this.props;
        return (
            <Route
                render={({ location }) => {
                    return (
                        <Switch>
                            <Route
                                component={AsyncComponent({
                                    component: () => import('../containers/list'),
                                    model: () => import('../models/list')
                                })}
                                exact
                                path="/"
                            />
                        </Switch>
                    );
                }}
            />
        );
    }
}
```

#### `Loading`

占位请求加载组件 （目前支持 request 中间层请求的数据）

    `className`: <string> 当前类名

    `include`: <array(string)|string> 指定当前那些请求控制期显示，默认为所有请求可控制（填写请求函数名称）

    `exclude`: <array(string)|string> 指定当前哪些请求不控制该组件显示与隐藏（填写请求函数名称）

    `content`: <array(ReactElement)|string|ReactElement> 内容

    `cover`: <boolean> 设置`content`是否覆盖默认图标 默认为false

```js
// 当前组件 只能是 serveGetPackageList 请求控制
<Loading className={s['loading-mask']} include="serveGetPackageList" />
```

#### models 层数据格式

借鉴 elm 概念，通过 reducers, effects 组织 model

-   namespace：models 标识
-   state：models 数据状态
-   effects：声明各种需要处理的 action
-   reducers：声明更改 state 的 action（必须为纯函数）

```js
export default {
    namespace: 'home',

    state: {
        nameList: []
    },

    effects: {
        *getNames({ payload }) {
            //各种操作
        }
    },
    reducers: {
        getNamesSuccess: (state, { payload }) => {
            return {
                ...state
                // 替换操作
            };
        }
    }
};
```

### `Push`

    高阶组件，向注册的仓库提交数据（仓库名需要在 init 中注册仓库）

第二个可以字符串，该字符串是 props 中数据的 key，会直接获取传递

```js
import React from 'react';
import { Push } from 'react-enhanced';

@Push('home', 'getName')
export default class App extends Component {
    render() {
        //...
    }
}
```

也可以是数组，既可以传递多个

```js
@Push('home',[ 'getName', 'getAge'])
```

也可以是函数，会将该组件所能获取到 props 传入，然后根据需求来传递以及自定义传递

```js
@Push('home',props => {
    return {
        // 各种操作
    }
})
```

### `Pull`

    高阶组件，向注册的仓库拉取数据（仓库名需要在 init 中注册仓库）

第二个可以字符串，该字符串是 props 中数据的 key，会直接获取传递

```js
import React from 'react';
import { Pull } from 'react-enhanced';

@Pull('home', 'getName')
export default class Name extends Component {
    render() {
        const { getName } = this.props;
        return <div onClick={getName}>获取名字</div>;
    }
}
```

也可以是数组，既可以传递多个

```js
@Pull('home', ['getName', 'getAge'])
```

如果初始化中有载入 `apiList` 那么可以通过 `$service` 来拉取服务

```js
@Pull('$service', ['serveGetUserInfo'])
```

### `request` 中间层

    用来简化请求 action 的流程

-   `request`： <Function> 请求函数
-   `will`： <String|Object> 请求前执行
-   `did`： <String|Object> 请求成功后执行
-   `callback`： <Function> 请求成功后执行（在 `did` 后面）
-   `error`： <Function> 请求失败调用（会覆盖 init 中`requestError`在该 action 上的执行）

`did`以及`will`可以是字符串，`will` 不会传递 payload，而`did`则会将请求成功的 data（如果在 init 中设置了`requestLimit`， 会根据其取值）直接绑定到 payload .

```js
{
    request: serveDeleteDs.bind(null, payload),
    did: 'list/deleteDsSuccess',
}
```

`did`以及`will`是对象，`will`直接执行，而`did`中如果 payload 是函数则其参数是获取到的 data 值（init 中设置了`requestLimit`，会根据其取值）；如果不传 payload 则和`did`是字符串效果是一样的；如果是指定了值，则就是该值.

```js
{
    request: serveDeleteDs.bind(null, payload),
    did: {
        type: 'list/deleteDsSuccess',
        payload
    }
}
```

## License

[MIT](https://tldrlegal.com/license/mit-license)
