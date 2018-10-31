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

### 注册仓库

在初始化`Provider`时注册

```js
import { init } from 'react-enhanced';

const { Provider } = init({
    warehouse: ['layout']
});
```

### 存数据

这里通过内置封装的高阶函数来实现，这里的写法是采用 `es7` 的装饰器模式

```js
import React from 'react
import { Push } from 'react-enhanced';

@Push('layout', () => {
    return {
        getName: () => {
            console.log('getname')
        },
        name: 'react-enhanced'
    }
})
export default class Layout extends React.Component {
    // ...
}
```

上面代码是向 `layout` 仓库提交了一个 `getName` 方法和 `name` 数据, 供后面的组件使用。

### 取数据

这里通过内置封装的高阶函数来实现，这里的写法是采用 `es7` 的装饰器模式

```js
import React from 'react
import { Pull } from 'react-enhanced';

@Pull('layout', ['getName', 'name'])
export default class LayoutChild extends React.Component {
    render() {

        const {getName, name} = this.props

        getName() // getname
        console.log(name) // react-enhanced


        // ...
    }
}
```

上面代码是从 `layout` 仓库下载下来 `getName` 方法和 `name` 数据,并且注入到组件的 `props` 中，方便内部调用。

## 注意

-   注意数据存储的前后顺序
