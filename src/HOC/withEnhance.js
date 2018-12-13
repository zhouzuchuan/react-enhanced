import React from 'react'
import { request, pull, push } from '../store'

export default WrappedComponent => {
    const name = WrappedComponent.displayName || WrappedComponent.name
    const WithEnhanceHoc = props => {
        return <WrappedComponent {...{ ...props, enhance: { request, pull, push } }} />
    }
    Reflect.defineProperty(WithEnhanceHoc, 'name', { value: `WithEnhanceHoc-${name}` })
    return WithEnhanceHoc
}
