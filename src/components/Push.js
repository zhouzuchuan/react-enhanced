/**
 * 传递context
 * */

import React from 'react'
import Install from './Install'

export default (id, fn) => WrappedComponent => {
    class Push extends React.Component {
        render() {
            const { __CONTEXT__, ...props } = this.props
            const ContextStore = __CONTEXT__[id]

            if (!ContextStore) {
                console.error(
                    '当前 Push id 不存在，请在 init contextID 中注册！'
                )
                return <WrappedComponent {...props} />
            }
            const dealValue = fn(props)
            return (
                <ContextStore.Provider value={dealValue}>
                    <WrappedComponent {...props} />
                </ContextStore.Provider>
            )
        }
    }
    return Install([], [id])(Push)
}
