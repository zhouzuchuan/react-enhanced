/**
 * 异步加载组件以及model
 * */

import React from 'react'
import Loadable from 'react-loadable'
import RE from './store'
import { isFunction, isArray, isObject } from './utils'

export default (params = {}) => {
    let loader = () => Promise.resolve()
    const ComponentLoading = RE.ComponentLoading

    if (isFunction(params)) {
        loader = params
    } else if (isObject(params)) {
        const { component, model = [] } = params
        loader = component
        //  提前加载 component
        Promise.all([component, ...(isArray(model) ? model : [model])].map(v => v())).then(data => {
            const m = data.slice(1)
            m && Object.values(m).forEach(v => RE.registerModel(v.default))
        })
    }

    return Loadable({
        loading() {
            return <ComponentLoading />
        },
        loader
    })
}
