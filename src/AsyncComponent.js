import React from 'react'
import Loadable from 'react-loadable'
import RE from './store'
import { isFunction, isArray, isObject } from './utils'

/**
 * 异步加载组件以及注入model
 *
 *
 * */

export default (params = {}) => {
    let loader = {}
    const ComponentLoading = RE.ComponentLoading

    let temp = false

    if (isFunction(params)) {
        loader = {
            component: params,
        }
    } else if (isObject(params)) {
        const { component, model = [] } = params

        // //  提前注入model
        Promise.all([...(isArray(model) ? model : [model])].map(v => v())).then(data => {
            if (data.length) {
                Object.values(data).forEach(v => RE.registerModel(v.default))
                temp = true
            }
        })

        loader = (isArray(model) ? model : [model]).reduce((r, v, i) => ({ ...r, [`model${i}`]: v }), { component })
    }

    return Loadable.Map({
        loading() {
            return <ComponentLoading />
        },
        loader,
        render({ component, ...models }, props) {
            let Component = component.default

            !temp &&
                models &&
                Object.entries(models).forEach(([k, v]) => k.startsWith('model') && RE.registerModel(v.default))

            return <Component {...props} />
        },
    })
}
