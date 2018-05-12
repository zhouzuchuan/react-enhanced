/**
 * 继承context
 * type: 当前类型，查看ContextStore
 * limit：获取CONTEXT中指定的key
 *
 * */
import React from 'react'
import lo from 'lodash'
import ContextStore from './ContextStore'

export default (type, limit = []) => WrappedComponent => {
    return class HOCComponent extends React.Component {
        render() {
            if (!ContextStore) {
                console.warn('HOC传值有误！')
                return <WrappedComponent {...this.props} />
            }
            return (
                <ContextStore.Consumer>
                    {context => {
                        const newProps = {
                            ...this.props,
                            CONTEXT: {
                                ...(lo.isEmpty(limit)
                                    ? context
                                    : lo.pick(context, limit))
                            }
                        }
                        return <WrappedComponent {...newProps} />
                    }}
                </ContextStore.Consumer>
            )
        }
    }
}
