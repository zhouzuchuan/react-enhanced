import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {
    // ConnectedRouter,
    routerReducer,
    routerMiddleware
} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import { all } from 'redux-saga/effects';

import { composeWithDevTools } from 'redux-devtools-extension';

import requestMiddleware from './middleware/requestMiddleware';
import promiseMiddleware from './middleware/promiseMiddleware';
import registerModel from './registerModel';
import AsyncComponent from './AsyncComponent';

// 创建 router histroy 中间件
const historyMiddleware = routerMiddleware(createHistory());

// 创建saga中间件
const sagaMiddleware = createSagaMiddleware();

/**
 *
 *
 * @export
 * @param {any} [{
 *     state： 默认state,
 *     reducers： 全局reducers,
 *     effects： 全局effects,
 *     middlewares： saga中间件,
 *     requestCallback：请求统一回调,
 *     requestError：请求统一错误处理,
 *     resultLimit：根据返回的数据数据格式，统一自定义返回
 * }={}]
 * @returns
 */
export function configureStore({
    state = {},
    reducers = {},
    effects = [],
    middlewares = [],
    requestCallback,
    requestError,
    resultLimit
} = {}) {
    const RE = {
        _effects: {},
        _reducers: {},
        asyncReducers: {
            route: routerReducer
        },
        asyncSagas: {},
        _models: []
    };

    // 中间件列表
    const middleware = [
        historyMiddleware,
        sagaMiddleware,
        requestMiddleware.bind(null, RE, {
            requestCallback,
            requestError,
            resultLimit
        }),
        promiseMiddleware.bind(null, RE),
        // sagaMiddleware,
        ...(middlewares || [])
    ];

    const operApplyMiddleware = applyMiddleware(...middleware);

    const store = createStore(
        combineReducers({
            ...reducers,
            ...RE.asyncReducers
            // route: routerReducer
        }),
        state,
        process.env.NODE_ENV === 'development' ? composeWithDevTools(operApplyMiddleware) : operApplyMiddleware
    );

    // 处理saga
    sagaMiddleware.run(function*() {
        yield all(effects);
    });

    // // 热重载reducers (requires Webpack or Browserify HMR to be enabled)
    // if (module.hot) {
    //     module.hot.accept('../reducers', () =>
    //         store.replaceReducer(
    //             require('../reducers') /*.default if you use Babel 6+ */
    //         )
    //     )
    // }

    store.asyncReducers = RE.asyncReducers;
    store.asyncSagas = RE.asyncSagas;

    const newR = registerModel.bind(null, RE, store, sagaMiddleware);

    return {
        store,
        registerModel: newR,
        AsyncComponent: AsyncComponent.bind(null, newR)
    };
}
