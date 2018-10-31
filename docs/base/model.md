# Model 模型

主要用来组织应用的状态管理以及副作用，它的实现借鉴了 `elm` 概念，通过 `reducers`, `effects` 组织 model。致敬 [dva](https://github.com/dvajs/dva)

## namespace

命名空间

## state

当前 model 的数据状态

## effects

`Effect` 来自于函数编程的概念，被称为副作用（因为它使得我们的函数变得不纯，同样的输入不一定获得同样的输出），在 `react-enhanced` 应用中，最常见的就是异步操作。

为了控制副作用的操作，底层引入了 `redux-sagas` 做异步流程控制，由于采用了 `generator` 的相关概念，所以将异步转成同步写法，从而将 `effects` 转为纯函数。

函数有下面两个参数

-   action： `dispatch`传递的对象
-   effects： 内置三个内部处理函数
    -   call：执行异步函数
    -   put：发出一个 `Action`，类似于 `dispatch`
    -   select：查询整个 `store` 的数据

```js
export default {
    // ...
    effects: {
        *addAction({ payload }, { put, call, select }) {
            yield call(delay, 1000);
            yield put({ type: 'success', payload: {name: 'react-enhanced' });
            const { app } = yield select(store => store);
        }
    }
    // ...
};
```

## reducers

同于 redux 里的 reducer，接收 action，同步更新 state
声明更改 state 的 action（必须为纯函数）

```js
export default {
    namespace: 'app',

    state: {
        name: []
    },

    effects: {
        *addAction({ payload }) {
            //各种操作
        }
    },
    reducers: {
        success: (state, { payload }) => {
            return {
                ...state
                ...payload
                // 替换操作
            };
        }
    }
};
```
