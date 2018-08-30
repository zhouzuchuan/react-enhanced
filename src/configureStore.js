import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import React from 'react';
import createSagaMiddleware from 'redux-saga';
import {
    // ConnectedRouter,
    routerReducer,
    routerMiddleware
} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import apiManage from 'api-manage';

import isEmpty from 'lodash.isempty';

import { Provider } from 'react-redux';

import { all } from 'redux-saga/effects';

// import { composeWithDevTools } from 'redux-devtools-extension';

import { isUndefined, loadFormat } from './utils';
import RE from './store';

import PlaceholderLoading from './components/PlaceholderLoading';

import requestMiddleware from './middleware/requestMiddleware';
import promiseMiddleware from './middleware/promiseMiddleware';
import registerModel from './registerModel';
import AsyncComponent from './AsyncComponent';
import loadingModel from './models/loading';
require('babel-regenerator-runtime');
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
    resultLimit,
    warehouse = [],
    loading = 0,
    apiList = {}
} = {}) {
    apiManage.init({ list: apiList });

    const [rl, cl] = loadFormat(loading);

    Object.entries({
        __warehouse__: warehouse.reduce(
            (r, v, i) => ({
                ...r,
                [v]: {}
            }),
            { ...(!isEmpty(apiList) ? { $service: apiManage.getService() } : {}) }
        ),
        _effects: {},
        _reducers: {},
        _models: [],
        asyncReducers: { route: routerReducer },
        asyncSagas: {},
        registerModel: registerModel.bind(null, sagaMiddleware),
        AsyncComponent: AsyncComponent.bind(null, cl),
        Loading: PlaceholderLoading(rl)
    }).forEach(([n, m]) => {
        RE[n] = m;
    });

    // 中间件列表
    const middleware2 = [
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

    // const operApplyMiddleware = applyMiddleware(...middleware2);

    // RE.__store__ = createStore(
    //     combineReducers({
    //         ...reducers,
    //         ...RE.asyncReducers
    //         // route: routerReducer
    //     }),
    //     state,
    //     process.env.NODE_ENV === 'development' ? composeWithDevTools(operApplyMiddleware) : operApplyMiddleware
    // );

    const devtools =
        process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__
            ? window.__REDUX_DEVTOOLS_EXTENSION__
            : () => noop => noop;

    RE.__store__ = createStore(
        combineReducers({
            ...reducers,
            ...RE.asyncReducers
            // route: routerReducer
        }),
        state,
        compose(...[applyMiddleware(...middleware2), devtools()])
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

    RE.Provider = props => <Provider {...{ ...props, store: RE.__store__ }} />;

    // if (!isUndefined(requestLoading)) RE.registerModel(loadingModel);
    RE.registerModel(loadingModel);

    return RE;
}
