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

import registerModel from './registerModel';
import AsyncComponent from './AsyncComponent';

// 创建 router histroy 中间件
const historyMiddleware = routerMiddleware(createHistory());

// 创建saga中间件
const sagaMiddleware = createSagaMiddleware();

export function configureStore({
    state = {},
    reducers = {},
    effects = [],
    middlewares = [],
    requestCallback,
    requestError
} = {}) {
    // 中间件列表
    const middleware = [
        historyMiddleware,
        sagaMiddleware,
        requestMiddleware.bind(null, { requestCallback, requestError }),
        ...(middlewares || [])
    ];

    const store = createStore(
        combineReducers({
            ...reducers,
            route: routerReducer
        }),
        state,
        composeWithDevTools(applyMiddleware(...middleware))
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

    store.asyncReducers = {};
    store.asyncSagas = {};

    const newR = registerModel.bind(null, store, sagaMiddleware);

    return {
        store,
        registerModel: newR,
        AsyncComponent: AsyncComponent.bind(null, newR)
    };
}
