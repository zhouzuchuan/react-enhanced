import React from 'react'
import { Provider } from 'react-redux'
import RE from '../store'

const ReactEnhancedProvider = props => {
    const { children, ...newProps } = props

    let component = children

    if (RE.persistor) {
        const C = require('redux-persist/integration/react').PersistGate
        component = (
            <C loading={null}
                persistor={RE.persistor}
            >
                {children}
            </C>
        )
    }
    return <Provider {...{ store: RE.__store__, ...newProps }}>{component}</Provider>
}

export default ReactEnhancedProvider
