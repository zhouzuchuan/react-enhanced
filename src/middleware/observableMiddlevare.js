import { isFunction, epicEnhance } from '../utils'
import { Subject, queueScheduler } from 'rxjs'
import { observeOn } from 'rxjs/operators'
import { ActionsObservable, StateObservable } from 'redux-observable'

import { console } from '../utils'

const actionSubject$ = new Subject().pipe(observeOn(queueScheduler))
const stateSubject$ = new Subject().pipe(observeOn(queueScheduler))
const action$ = new ActionsObservable(actionSubject$)

export default (RE, store) => {
    const { dispatch, getState } = store
    const state$ = new StateObservable(stateSubject$, getState())
    return next => action => {
        if (isFunction(action)) {
            action(dispatch, getState)
            return
        }
        const { __RE_OBSERVABLE_RESOLVE__, __RE_OBSERVABLE_REJECT__, ...rest } = action

        if (isFunction(__RE_OBSERVABLE_RESOLVE__) && isFunction(__RE_OBSERVABLE_REJECT__)) {
            const fns = RE._epics[rest.type]
            if (isFunction(fns)) {
                try {
                    __RE_OBSERVABLE_RESOLVE__(epicEnhance(fns)(action$, state$))
                } catch (e) {
                    __RE_OBSERVABLE_REJECT__(e)
                }
            } else {
                console.warn(`${rest.type} must be function!`)
                __RE_OBSERVABLE_REJECT__(new Error())
            }
        } else {
            if (Object.values(rest).length) next(rest)
        }
    }
}
