# 更新日志

## v2.1.0 (2019.6.28)

-   路由 bug

## v2.0.8 (2019.5.13)

-   guard 路由守卫添加第二个参数 `dispatch`
-   tools 新增 `immutableSetState` 方法

## v2.0.0 (2019.4.21)

-   重新定位 react-enhanced 方向（辅助增强）
-   model-redux 外部使用，不在内置封装
-   删除高阶组件 withEnhance，pull、push、request、Model、Install
-   新增 hooks 调用方法：
    新增 useWarehouse 使用仓库系统 返回 指定的仓库以及仓库的 pull push
    新增 useRequest 使用 request 中间件封装
    新增 useAction 使用统一封装 action
-   中间件接口暴露，requestMiddleware 中间件 requestCallback 返回 true 才执行 request 的 callback 回调
-   修复以及优化部分细节、BUG

## v1.0.0 (2018.12.1)

-   升级 api-mange、data-mock 依赖
-   新增高阶组件 Request 来方便简化 request 中间件使用
-   新增高阶组件 withEnhance 方便注入 React-enhanced 内置方法 pull、push、request
-   修复以及优化部分细节、BUG
-   model 支持函数写法，可以注入 pull、push、request 方法
-   引入 Rxjs 思想，model 副作用改用 redux-observable 组织，redux-saga 依然兼容 1.x，2.0 版本会移除
-   Install 列入不稳定黑名单 ，依然兼容 1.x，2.0 版本会移除
-   Loading 组件改用开源库 react-spinkit 重构，提供更多 loading 样式
-   request 以及 pull 方法，第二个参数支持 true，拉取以及注入仓库的全部功能
-   添加 tools 模块，并且在其上了从 immutable 上获取数据的统一方法 immutableSelector

## v0.2.0 (2018.10.31)

-   `【修复】`：修复 `Loading` 组件流程控制

## 0.1.2 (2018.10.1)

-   修复：model effect 中使用 request 不触发 Loading
-   新增：Loading 组件添加 mask 蒙版参数
-   新增：Pull 和 Push 会分别注入 pull 和 push 方法到组件 props

## 0.1.1 (2018.9.19)

-   优化：升级 api-manage 依赖，
-   优化：init 中 apiList 参数，新增 api 参数，并且支持 request 自定义
-   优化：Loading 组件触发机制，组件内子组件加载中隐藏，反之显示
-   新增：Loading props content 来定义加载组件内容

## 0.1.0 (2018.9.10)

-   fix：asyncomponent model bug

## 0.0.18 (2018.8.30)

-   refactor：合并 requestLoading 和 componentLoading 实现 loading 参数
-   fix：request 请求 did 和 will effect 不成功
-   refactor：RequestLoading 更改为 Loading 并新增 include 和 exclude 参数
-   refactor：升级 api-manage 依赖，新增 prop-types 依赖

## 0.0.14 (2018.7.8)

-   优化：加载组件可自定义 class
-   优化：重构仓库实现逻辑
-   修复：跨路由仓库不能共享

## 0.0.13 (2018.5.30)

-   修复：已加载 model，重复加载问题
-   新增：请求占位组件 Loading

## 0.0.12 (2018.5.30)

-   修复：effects yield 无法执行

## 0.0.11 (2018.5.30)

-   修复：控制台提示问题
-   新增：effects 中声明的 action 可以返回 promise，回调处理

## 0.0.10 (2018.5.21)

-   优化：异步加载默认 Loading 组件，以及配置接口
-   优化：封入 react-saga
-   优化：Push 参数截取方式
-   优化：init 整体控制提示
