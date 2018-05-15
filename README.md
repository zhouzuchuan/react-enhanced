# react-enhanced &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) [![download](https://img.shields.io/npm/dm/react-enhanced.svg)](https://www.npmjs.com/search?q=react-enhanced) [![npm](https://img.shields.io/npm/v/react-enhanced.svg)](https://www.npmjs.com/search?q=react-enhanced)

基于 redux、redux-saga 的 react 无侵入增强器。

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

*    降低 react 开发门槛，以及提高开发效率
*    无侵入使用，对已使用的框架友好
*    实现 model 层，方便管理异步操作以及复用

## 使用

*   增强 Provider

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

-   异步组件以及 model 注册

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
                                        component: () =>
                                            import('../containers/list'),
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
