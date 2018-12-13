import { isFunction } from '../utils'
import { put, call, select } from 'redux-saga/effects'

export default (RE, store) => next => action => {
    const { dispatch, getState } = store

    if (isFunction(action)) {
        action(dispatch, getState)
        return
    }

    const { __RE_PROMISE_RESOLVE__, __RE_PROMISE_REJECT__, ...rest } = action

    function* actionG() {
        try {
            const ret = yield RE._effects[rest.type](rest, { put, call, select })

            // next(rest);
            __RE_PROMISE_RESOLVE__(ret)
        } catch (e) {
            __RE_PROMISE_REJECT__(e)
        }
    }

    if (isFunction(__RE_PROMISE_REJECT__) && isFunction(__RE_PROMISE_RESOLVE__)) {
        const gen = actionG()
        function next2() {
            const ret = gen.next()
            if (!ret.done) next2()
        }
        next2()
    } else {
        // 如果为空则不继续执行
        if (Object.values(rest).length) next(rest)
    }
}
