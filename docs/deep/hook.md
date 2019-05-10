# Hook

## useWarehouse

使用仓库

-   参数为在 init 中声明的仓库名称
-   参数返回一个数组，里面的子项分别对应【仓库数据 wh, 操作方法 push】
-   push 只可以对仓库数据的添加以及子项数据覆盖

```js
import React from 'react';
import { hooks } from 'react-enhanced';

const Layout = () => {
    const [wh, push] = hooks.useWarehouse('layout');
};
```

## useRequest

调用该方法，他会自动将`api清单`中的 apiServe 全部 request 化，自动绑定到 request 参数中，减少样板代码

```js
const { serveGetToken } = useRequest();
```

上面的 `serveGetToken` 包含两个参数 【数据，参数】

-   数据是接口传递给服务端的请求数据
-   参数为 object, 则是在里面声明使用的参数 如：did/will/callback/tplData
    这里面将 apiServe 的第二个参数 路由参数 ,封装到了里面，通过 tplData 声明

```js
// serveGetToken 调用的api地址为 /api/getToken/:name
const { serveGetToken } = useRequest();

// 该方法则匹配 /api/getToken/helloword  请求数据为{id:1}
serveGetToken(
    { id: 1 },
    {
        tplData: { name: 'helloword' },
    },
);
```

## useAction

简化 action，方便扩展

```js
import { hooks, connect } from 'react-enhanced';

hooks.useAction('home/getName')



@connect(null, () => ({
    getName: hooks.useAction('home/getName')

}))
// 等同于
@connect(null, (dispatch) => ({
    getName: (option) => {
        dispatch({ type: 'home/getName', ...option })
    }

}))


// 组建了内调用
tihs.props.getName({
    payload: '',
})


```
