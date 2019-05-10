# 工具

## registerModel

注册 model-redux 模型

```js
import { tools } from 'react-enhanced';

/**
 * 参数
 * 可以是单个model {}
 * 多个model [{}]
 * */
tools.registerModel();
```

## immutableSelector

获取 immutable 对象 数据

-   @param {\*} source

immutable 对象

-   @param {Array} pathArr

选取路径集合，采用.拼接路径
如果子项是 array 则返回的数据经过 toJS 转换

```js
// 获取嵌套数据
immutableSelector(app, ['data.list']);
// 多个数据
immutableSelector(app, ['name', 'age']);
// 获取的Imuutable数据 经过toJS处理
immutableSelector(app, [['children']]);
```
