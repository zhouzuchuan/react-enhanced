import React from 'react'
import { Provider } from 'react-redux'
import { ReactEnhancedContext, ReStore } from './store'

const ReactEnhancedProvider: React.FC = ({ children, ...otherProps }) => (
    <ReactEnhancedContext.Provider value={ReStore}>
        <Provider {...{ store: Reflect.get(ReStore, 'store'), ...otherProps }}>
            {children}
        </Provider>
    </ReactEnhancedContext.Provider>
)
export default ReactEnhancedProvider
