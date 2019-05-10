# 仓库系统

## 介绍

内置一套在应用使用期间供存取的`懒仓库`系统，为什么叫懒仓库，因为它不实现数据绑定（如果实现就是 `redux` 提供的功能）。

类似于以下代码：

```js
var GLOBAL = {};

// 存
GLOBAL.name = 'react-enhanced';

// 取
console.log(GLOBAL.name);
```

## 应用场景

对于那些不需要动态绑定更新的数据，可以用它来存取，比如：方法等，避免不必要的性能更新损耗，

## 使用

通过采用 React hooks 方案实现的 useWarehouse 方法，来对声明仓库的操作，

### 注册仓库

在初始化`Provider`时注册

```js
import { init } from 'react-enhanced';

const { Provider } = init({
    warehouse: ['layout'],
});
```

### useWarehouse

[点击这里](/deep/hook?id=usewarehouse)

## 注意

-   注意数据存储的前后顺序
