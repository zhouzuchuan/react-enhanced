import React from 'react'
import { Provider } from 'react-redux'
import RE from '../store'

const ReactEnhancedProvider = props => {
    const { children, ...newProps } = props

    let component = children

    return <Provider {...{ store: RE.__store__, ...newProps }}>{component}</Provider>
}

export default ReactEnhancedProvider
