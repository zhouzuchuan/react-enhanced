# 更新日志

### `0.1.2`

-   修复：model effect 中使用 request 不触发 Loading

### `0.1.1` (2018.9.19)

-   优化：升级 api-manage 依赖，
-   优化：init 中 apiList 参数，新增 api 参数，并且支持 request 自定义
-   优化：Loading 组件触发机制，组件内子组件加载中隐藏，反之显示
-   新增：Loading props content 来定义加载组件内容

### `0.1.0` (2018.9.10)

-   fix：asyncomponent model bug

### `0.0.18` (2018.8.30)

-   refactor：合并 requestLoading 和 componentLoading 实现 loading 参数
-   fix：request 请求 did 和 will effect 不成功
-   refactor：RequestLoading 更改为 Loading 并新增 include 和 exclude 参数
-   refactor：升级 api-manage 依赖，新增 prop-types 依赖

### `0.0.14` (2018.7.8)

-   优化：加载组件可自定义 class
-   优化：重构仓库实现逻辑
-   修复：跨路由仓库不能共享

### `0.0.13` (2018.5.30)

-   修复：已加载 model，重复加载问题
-   新增：请求占位组件 Loading

### `0.0.12` (2018.5.30)

-   修复：effects yield 无法执行

### `0.0.11` (2018.5.30)

-   修复：控制台提示问题
-   新增：effects 中声明的 action 可以返回 promise，回调处理

### `0.0.10` (2018.5.21)

-   优化：异步加载默认 Loading 组件，以及配置接口
-   优化：封入 react-saga
-   优化：Push 参数截取方式
-   优化：init 整体控制提示
