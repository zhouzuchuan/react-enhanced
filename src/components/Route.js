import * as React from 'react'
import { Route } from 'react-router-dom'
import RE from '../store'

const RcRoute = props => {
    if (RE.guardFunction && !RE.guardFunction(props, RE.dispatch)) {
        return null
    }
    return <Route {...props} />
}

export default RcRoute
