import get from 'lodash.get';
import { isFunction, isArray, isObject, isString, isUndefined } from '../utils';
import { put, call, select } from 'redux-saga/effects';

const take = (obj, path) => get(obj, path);

export default (RE, store) => next => action => {
    const { dispatch, getState } = store;

    if (isFunction(action)) {
        action(dispatch, getState);
        return;
    }

    const { __RE_PROMISE_RESOLVE__, __RE_PROMISE_REJECT__, ...rest } = action;

    function* actionG() {
        try {
            const ret = yield* RE._effects[rest.type](rest, { put, call, select });
            __RE_PROMISE_RESOLVE__(ret);
        } catch (e) {
            __RE_PROMISE_REJECT__(e);
        }
    }

    if (isFunction(__RE_PROMISE_REJECT__) && isFunction(__RE_PROMISE_RESOLVE__)) {
        const gen = actionG();
        function next2() {
            const ret = gen.next();
            if (!ret.done) next2();
        }
        next2();
    } else {
        next(rest);
    }
};
