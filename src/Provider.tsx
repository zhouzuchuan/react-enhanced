import React from 'react'
import { Provider } from 'react-redux'
import { ReStore } from './store'

const ReactEnhancedProvider: React.FC = ({ children, ...otherProps }) => (
    <Provider {...{ store: ReStore.get('store'), ...otherProps }}>
        {children}
    </Provider>
)
export default ReactEnhancedProvider
