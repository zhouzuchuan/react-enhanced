# 参数

## init

初始化入口，生成 `Provider`

```js
import { init, middlewares } from 'react-enhanced';

const { Provider } = init({
    warehouse: [], // 仓库名
    api: {
        list: apiList,
    },
    // 路由守卫（必须使用components.Route组件）
    guard: (router: RouteProps, dispatch: Dispatch) => true,
    modelConfig: {
        persist: {
            // 通过在这里设置需要持久化的 model (model的namespace)
            whitelist: [],
        },
        middlewares: [
            [
                middlewares.requestMiddleware.bind(null, {
                    requestCallback: (req: any) => true,
                    resultLimit: 'result',
                }),
            ],
        ],
    },
});
```

-   `warehouse`

    声明仓库名称

-   `loading`

    加载动画组件，分别对应 [请求加载组件，路由加载组件]

    由于增强器中内置了 `React Spinkit`，故而可以复制 name 具体可以[参考这里](https://kyleamathews.github.io/react-spinkit/)

    默认采用的是 `wave`

-   `guard`

    使用 组件 Route ,在路由切换前会获取执行该钩子，用于实现路由权限控制，

-   `api`

    封装了 [api-manage](https://github.com/zhouzuchuan/api-manage)，即声明 其 `init` 参数

-   `modelConfig`

    封装了 [model-redux](https://github.com/zhouzuchuan/model-redux)，即声明 其 `create` 参数

## asyncComponent

用来异步组件以及 model 注册

-   `component`： <Promise|none> 加载组件，
-   `model`： <Promise|Array[Promise]|none> 加载 model，（采用数组的方式可以注册多个 model）
-   `loading`： <ReactElement|none> 组件加载动画

```js
import React from 'react';
import { asyncComponent, components } from 'react-enhanced';

const { Route } = components;

export default class App extends Component {
    render() {
        return (
            <Route
                component={asyncComponent({
                    component: () => import('../containers/list'),
                    model: () => import('../models/list'),
                })}
                exact
                path="/"
            />
        );
    }
}
```

## components

集成组件，具体[点击这里](/base/component?id=%E9%9B%86%E6%88%90%E7%BB%84%E4%BB%B6)

## hocs

高阶组件以及高阶函数，具体[点击这里](/base/component?id=高阶组件)

## tools

辅助工具，具体[点击这里](/deep/tool?id=工具)

## middlewares

`redux` 中间件，具体[点击这里](/base/request?id=request-中间件)

## hooks

`React Hook` 方案规则的辅助工具及组件，具体[点击这里](/deep/hook?id=hook)

## connect

该方法是 `react-redux` 中提供的方法，连接模型以及组件的桥梁，向组件注入 props

## bindActionCreators

该方法是 `redux` 中提供的方法，用来处理需要向组件中传递多个 `action` 时，简化流程以及减少样板代码

接下来我们对比下写法区别

下面是没有使用

```js

@connect(null, dispatch => ({
    getA: () => {
        dispatch({ type: 'app/getA' })
    },
    getB: () => {
        dispatch({  type: 'app/getA' })
    },
    getC: () => {
        dispatch({ type: 'app/getA' })
    },
    // ...
}))
```

下面是使用了

```js


@connect(null, dispatch => bindActionCreators({
    getA: () => ({ type: 'app/getA' })
    getB: () => ({ type: 'app/getB' })
    getC: () => ({ type: 'app/getC' })
}, dispatch))
```
