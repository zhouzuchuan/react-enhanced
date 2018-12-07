import { isFunction } from '../utils';
import { Subject, queueScheduler } from 'rxjs';
import { observeOn } from 'rxjs/operators';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { resolve } from 'url';

const actionSubject$ = new Subject().pipe(observeOn(queueScheduler));
const stateSubject$ = new Subject().pipe(observeOn(queueScheduler));
const action$ = new ActionsObservable(actionSubject$);

export default (RE, store) => next => action => {
    const { dispatch, getState } = store;

    if (isFunction(action)) {
        action(dispatch, getState);
        return;
    }

    const state$ = new StateObservable(stateSubject$, store.getState());

    const { __RE_OBSERVABLE_RESOLVE__, __RE_OBSERVABLE_REJECT__, type, ...rest } = action;

    if (isFunction(__RE_OBSERVABLE_RESOLVE__) && isFunction(__RE_OBSERVABLE_REJECT__)) {
        const fns = RE._epics[type];
        if (isFunction(fns)) {
            __RE_OBSERVABLE_RESOLVE__(fns(action$, state$));
        } else {
            // console.log(__RE_OBSERVABLE_REJECT__);
            // __RE_OBSERVABLE_REJECT__();
        }
    } else {
        next({ type, ...rest });
    }
};
