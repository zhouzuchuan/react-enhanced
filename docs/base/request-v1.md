# Request 层

主要是用来简化请求 action 的流程，以及方便对其流程控制

```js
// action
{
    request: serveGetList,
    will: {
        type: 'app/willAction',
    }
    callback: (data) => {
        console.log(data)
    },
    did: 'app/didAction',
}
```

## 参数

### request

请求函数

```js
import axios from 'axios
const serveGetList = () => axios.get('http://....')
// action
{
    request: serveGetList,
}
```

### will

请求前执行

```js
{
    request: serveGetList.bind(null, payload),
    will: {
        type: 'app/willAction',
        payload: {name: 'react-enhanced'}
    },
}
```

如果不需要传递`payload`，而只是发送个 `action`，可以用以下写法简化

```js
{
    request: serveGetList.bind(null, payload),
    will: 'app/willAction',
}
```

### did

请求成功后执行

```js
{
    request: serveGetList.bind(null, payload),
    did: {
        type: 'app/didAction',
        payload: {}
    },
}
```

如果采用下面简化写法，则返回后的数据则会赋值给`payload`（如果在 `init` 中设置了`requestLimit`， 会根据其取值），

```js
{
    request: serveGetList.bind(null, payload),
    did: 'app/didAction',
}
```

当然，为了更加简化操作，`payload`可以直接是函数，对返回的数据进行处理后在发送

```js
{
    request: serveGetList.bind(null, payload),
    did: {
        type: 'app/didAction',
        payload: (data) => {
            // 在这里进行处理
            // ...
            return {
                name: 'react-enhanced'
            }
        }
    },
}
```

### callback

请求成功后执行（在 `did` 之前触发）

会传递两个参数 `data` 是 在 `init` 中设置了`requestLimit`处理的值， `result` 为返回的数据

```js
{
    request: serveGetList.bind(null, payload),
    callback: (data, result) => {
        // ...
    }
}
```

### error

请求失败或者函数执行错误调用

```js
{
    request: serveGetList.bind(null, payload),
    error: (err) => {
        // ...
    }
}
```

## 注意

-   `request`为必填，如果没有这个参数，则该 `action`, 不经过 Request 层处理
-   `request`可以使用 [api-manage](https://github.com/zhouzuchuan/api-manage) 来处理，减少样板代码（已对该插件封装）
