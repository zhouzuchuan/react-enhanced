import React from 'react'

export const CreateProvider = (
    { store, registerModel, AsyncComponent },
    contextID
) => WrappedComponent => {
    return class A extends React.Component {
        render() {
            return (
                <WrappedComponent
                    {...{
                        store,
                        __RE__: { registerModel, AsyncComponent },
                        __CONTEXT__: contextID.reduce((r, v) => {
                            return {
                                ...r,
                                [v]: React.createContext()
                            }
                        }, {}),
                        ...this.props
                    }}
                />
            )
        }
    }
}
