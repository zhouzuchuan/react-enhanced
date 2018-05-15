/**
 * 传递context
 * */

import React from 'react'
import lo from 'lodash'
import ContextStore from './ContextStore'

export default (type, transferKey = [], cust = {}) => WrappedComponent => {
    // console.log(WrappedComponent)
    return class HOCComponent2 extends React.Component {
        render() {
            console.log(this.props)
            return (
                <ContextStore.Provider
                    value={{
                        __RE__: this.props.__RE__,
                        ...lo.pick(this.props, transferKey),
                        ...(this.props.CONTEXT || {}),
                        ...cust
                    }}
                >
                    <WrappedComponent
                        {...lo.omit(this.props, [...transferKey, 'CONTEXT'])}
                    />
                </ContextStore.Provider>
            )
        }
    }
}
