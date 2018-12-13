/**
 * 传递context
 * */

import React from 'react'
import { push } from '../store'
import { isArray, isFunction } from '../utils'
import pick from 'lodash.pick'

const deal = (l, p) => {
    return isFunction(l) ? l(p) : pick(p, isArray(l) ? l : [l])
}

export default (...params) => WrappedComponent => {
    const name = WrappedComponent.displayName || WrappedComponent.name
    const PushHoc = props => {
        const [id, fn = []] = params
        if (params.length > 1) {
            push(id, deal(fn, props))
        } else {
            push(deal(id, props))
        }

        return <WrappedComponent {...{ ...props }} />
    }
    Reflect.defineProperty(PushHoc, 'name', { value: `PushHoc-${name}` })
    return PushHoc
}
