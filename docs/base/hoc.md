# 高阶函数

## Install

高阶组件，向组件注入方法，如注入 AsyncComponent

### AsyncComponent

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
                <Loading className={s['loading-mask']} include="serveGetPackageList" />
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

## Push

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

## Pull

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

## connect

## bindActionCreators
