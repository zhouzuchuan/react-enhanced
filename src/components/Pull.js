/**
 * 继承context
 * type: 当前类型，查看ContextStore
 * limit：获取CONTEXT中指定的key
 *
 * */
import Install from './Install'
import React from 'react'
import lo from 'lodash'

export default (id, limit = []) => WrappedComponent => {
    class Pull extends React.Component {
        render() {
            const { __CONTEXT__, ...props } = this.props
            const ContextStore = __CONTEXT__[id]

            if (!ContextStore) {
                console.warn('HOC传值有误！')
                return <WrappedComponent {...this.props} />
            }

            return (
                <ContextStore.Consumer>
                    {context => {
                        const newProps = {
                            ...props,
                            ...lo.pick(context, limit)
                        }
                        return <WrappedComponent {...newProps} />
                    }}
                </ContextStore.Consumer>
            )
        }
    }
    return Install([], [id])(Pull)
}
