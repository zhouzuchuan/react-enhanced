import { combineReducers } from 'redux';

import { fork, takeLatest, all } from 'redux-saga/effects';

export function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    };
}

const addNameSpace = (obj = {}, namespace) =>
    Object.entries(obj).reduce(
        (r, [n, m]) => ({ ...r, [`${namespace}/${n}`]: m }),
        {}
    );

export function injectAsyncReducers(store, asyncReducers, initialState) {
    let flag = false;

    if (asyncReducers) {
        for (let [n, m] of Object.entries(asyncReducers)) {
            if (Object.prototype.hasOwnProperty.call(asyncReducers, n)) {
                if (store && !(store.asyncReducers || {})[n]) {
                    store.asyncReducers[n] = createReducer(
                        initialState[n] || {},
                        m
                    );
                    flag = true;
                }
            }
        }
        flag && store.replaceReducer(combineReducers(store.asyncReducers));
    }
}

export function injectAsyncSagas(store, sagas, sagaMiddleware) {
    if (sagas) {
        for (let [n, m] of Object.entries(sagas)) {
            if (Object.prototype.hasOwnProperty.call(sagas, n)) {
                if (store && !(store.asyncSagas || {})[n]) {
                    store.asyncSagas[n] = m;
                    sagaMiddleware.run(m);
                }
            }
        }
    }
}

export default function registerModel(store, sagaMiddleware, models) {
    const deal = (Array.isArray(models) ? models : [models])
        // .filter(({ namespace, effects, reducer }) => {
        //     if (typeof namespace === 'undefined')
        //         return [namespace, effects, reducer].every(
        //             v => !lo.isUndefined(v)
        //         );
        // })
        .reduce((r, { namespace, effects = {}, reducers = {}, state = {} }) => {
            if (typeof namespace === 'undefined') {
                return r;
            }
            return {
                state: {
                    ...(r.state || {}),
                    [namespace]: state
                },
                sagas: {
                    ...(r.sagas || {}),
                    [namespace]: addNameSpace(effects, namespace)
                },
                reducers: {
                    ...(r.reducers || {}),
                    [namespace]: addNameSpace(reducers, namespace)
                }
            };
        }, {});

    injectAsyncReducers(store, deal.reducers, deal.state);
    injectAsyncSagas(
        store,
        Object.entries(deal.sagas).reduce((r, [name, fns]) => {
            return {
                ...r,
                [name]: function*() {
                    yield all([
                        fork(function*() {
                            yield Object.entries(fns).map(([n, m]) => {
                                return takeLatest(n, m);
                            });
                        })
                    ]);
                }
            };
        }, {}),
        sagaMiddleware
    );
}
