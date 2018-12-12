import { combineReducers } from 'redux';
import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';
import pick from 'lodash.pick';
import RE from './store';
import { fork, takeLatest, all, put, select, call } from 'redux-saga/effects';

import { epicEnhance, addNameSpace, isUndefined, isFunction, isObject } from './utils';

export const createReducer = (initialState, handlers) => (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
        return handlers[action.type](state, action);
    } else {
        return state;
    }
};

export function injectAsyncReducers(asyncReducers, initialState) {
    let flag = false;

    if (asyncReducers) {
        for (let [n, m] of Object.entries(asyncReducers)) {
            if (Object.prototype.hasOwnProperty.call(asyncReducers, n)) {
                if (RE && !(RE.asyncReducers || {})[n]) {
                    RE.asyncReducers[n] = createReducer(initialState[n] || {}, m);
                    flag = true;
                }
            }
        }
        flag && RE.__store__.replaceReducer(combineReducers(RE.asyncReducers));
    }
}

export function injectAsyncSagas(sagas, sagaMiddleware) {
    if (sagas) {
        for (let [n, m] of Object.entries(sagas)) {
            if (Object.prototype.hasOwnProperty.call(sagas, n)) {
                if (RE && !(RE.asyncSagas || {})[n]) {
                    RE.asyncSagas[n] = m;
                    sagaMiddleware.run(m);
                }
            }
        }
    }
}

export function injectAsyncEpics(epics, epicMiddleware) {
    if (epics) {
        const epic$ = new BehaviorSubject(
            combineEpics(
                ...Object.entries(epics).reduce((r, [n, m = {}]) => {
                    RE.asyncEpics[n] = m;
                    return [...r, ...Object.values(m).map(v => epicEnhance(v))];
                }, [])
            )
        );

        const rootEpic = (action$, state$) => epic$.pipe(mergeMap(epic => epic(action$, state$)));

        epicMiddleware.run(rootEpic);
    }
}

export default function registerModel(sagaMiddleware, epicMiddleware, models) {
    const deal = (isFunction(models)
        ? [models(pick(RE, ['pull', 'push', 'request']))]
        : Array.isArray(models)
        ? models
        : [models]
    )
        .filter(model => {
            if (!isObject(model)) {
                console.warn(`model 必须导出对象，请检查！`);
                return false;
            }
            const { namespace } = model;
            if (isUndefined(namespace)) {
                console.warn(`namespace 必填并且唯一，请检查！`);
                return false;
            }

            RE._models.push(namespace);
            return true;
        })
        .reduce((r, { namespace, effects = {}, reducers = {}, state = {}, epics = {} }) => {
            const dealSagas = addNameSpace(effects, namespace);
            const dealEpics = addNameSpace(epics, namespace);
            const dealReducers = addNameSpace(reducers, namespace);

            RE._effects = {
                ...RE._effects,
                ...dealSagas
            };

            RE._epics = {
                ...RE._epics,
                ...dealEpics
            };
            return {
                state: {
                    ...(r.state || {}),
                    [namespace]: state
                },
                sagas: {
                    ...(r.sagas || {}),
                    [namespace]: dealSagas
                },
                reducers: {
                    ...(r.reducers || {}),
                    [namespace]: dealReducers
                },
                epics: {
                    ...(r.epics || {}),
                    [namespace]: dealEpics
                }
            };
        }, {});

    if (!deal.sagas) return;

    injectAsyncReducers(deal.reducers, deal.state);
    injectAsyncEpics(deal.epics, epicMiddleware);
    injectAsyncSagas(
        Object.entries(deal.sagas).reduce((r, [name, fns]) => {
            return {
                ...r,

                // [name]: function*() {
                //     yield all([
                //         fork(function*() {
                //             yield Object.entries(fns).map(([n, m]) => {
                //                 return takeLatest(n, m);
                //             });
                //         })
                //     ]);
                // }
                [name]: function*() {
                    yield all([
                        fork(function*() {
                            yield all([
                                ...Object.entries(fns).map(([n, m]) => {
                                    return takeLatest(n, function*(action) {
                                        yield all([
                                            fork(
                                                m.bind(null, action, {
                                                    put,
                                                    select,
                                                    call
                                                })
                                            )
                                        ]);
                                    });
                                })
                            ]);
                        })
                    ]);
                }
            };
        }, {}),
        sagaMiddleware
    );
}
