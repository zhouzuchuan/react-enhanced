# 组件

## 集成组件

### Loading

占位请求加载组件 （目前支持 request 中间层请求的数据）

```js
import React from 'react';
import { Install } from 'react-enhanced';

@Install(['Loading'])
export default class App extends Component {
    render() {
        const { AsyncComponent } = this.props;
        return (
            <div>
                // 当前组件 只能是 serveGetPackageList 请求控制
                <Loading className={s['loading-mask']} include="serveGetPackageList">
                    // 包裹组件
                </Loading>
                // 其他组件
            </div>
        );
    }
}
```

-   `className`: <string> 当前类名
-   `include`: <array(string)|string> 指定当前那些请求控制期显示，默认为所有请求可控制（填写请求函数名称）
-   `exclude`: <array(string)|string> 指定当前哪些请求不控制该组件显示与隐藏（填写请求函数名称）
-   `content`: <array(ReactElement)|string|ReactElement> 内容
-   `cover`: <boolean> 设置`content`是否覆盖默认图标 默认为 false
-   `mask`: <boolean> 是否显示遮罩

下面是显示遮罩的写法

```js
<Loading include="serveGetPackageList" mask>
    // 当前组件 只能是 serveGetPackageList 请求控制才显示加载
    <div />
</Loading>
```

### Route

基于 `react-router` 的 `Route` 组件，封装了权限控制，通过 `init.guard` 返回的结果来判断是否渲染路由组件, `false`不渲染，`true`渲染

```js
// index.js
const { Provider } = init({
    // ...
    guard: (router: RouteProps) => true,
});

// 组件

import { components, asyncComponent } from 'react-enhanced';

const { Route } = components;

const App = () => {
    return (
        <Switch>
            <Route component={asyncComponent(() => import('@cn/Home'))} exact={true} path="/" />
            <Route
                component={asyncComponent({
                    component: () => import('@cn/Edit'),
                    model: () => import('@m/edit'),
                })}
                exact={true}
                path="/edit"
            />
        </Switch>
    );
};
```

## 高阶组件

### createModal

注入 antd Modal 模态框，（受控组件）

```js
import { hocs } from 'react-enhanced';

const { createModal } = hocs;

@createModal({
    okTrigger: 'handleOk',
    cancelTrigger: 'handleCancel',
    modal: {
        title: '用户名称',
    },
})
export default class userModal extends React.Component {
    handleOk = () => {};
    handleCancel = () => {};
    render() {
        return <div />;
    }
}
```

-   `okTrigger` string 点击确定的回调，指定的组件内的方法
-   `cancelTrigger` string 点击取消的回调，指定的组件内的方法
-   `createAndshowAfter` string 显示模态框回调，指定的组件内的方法
-   `modal` object antd 的 Modal Porps, 具体请查看 antd 文档
-   `control` boolean 弹框控制 如果为 true，则被包裹的组件会注入修改 Modal 参数的方法 `modalControlState`

包裹组件的的 props

-   `count` number 来控制弹框的显示 如果为 0 则隐藏 大于 0 则显示
-   `modal` number object antd 的 Modal Porps, 具体请查看 antd 文档 优先级高于 option 里的 modal

```js

import React from 'react'
import { Button } from 'antd

export default class Wrap extends React.Component {
    state = {
        count: 0,
    };
    handleOpenModal = () => {
        this.setState(({count}) => ({
            count: count+1
        }))
    }
    render() {
        const { count } = this.props;
        return (
            <div>
                <Button onClick={this.handleOpenModal} />
                <userModal count={count} />
            </div>
        );
    }
}
```
