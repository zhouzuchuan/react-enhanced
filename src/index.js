import { configureStore } from './configureStore'
import React from 'react'
export { default as registerModel } from './registerModel'
export { default as AsyncComponent } from './AsyncComponent'

import XRProvider from './components/Provider'

export { default as ExtendsContext } from './components/ExtendsContext'

const aa = ({ store, registerModel, AsyncComponent }) => WrappedComponent => {
    return class A extends React.Component {
        render() {
            return (
                <WrappedComponent
                    {...{
                        store,
                        XR: { registerModel, AsyncComponent },
                        ...this.props
                    }}
                />
            )
        }
    }
}

export const init = () => {
    return {
        Provider: aa(configureStore())(XRProvider)
        // ExtendsContext
    }
}
