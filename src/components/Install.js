/**
 * 注入方法
 * type: 当前类型，查看ContextStore
 * limit：获取CONTEXT中指定的key
 *
 * */
import React from 'react'
import lo from 'lodash'
import ContextStore from './ContextStore'

export default (inject = [], CONTEXT = []) => WrappedComponent => {
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
                            ...lo.pick(context.__RE__, inject),
                            __CONTEXT__: lo.pick(context.__CONTEXT__, CONTEXT)
                        }
                        return <WrappedComponent {...newProps} />
                    }}
                </ContextStore.Consumer>
            )
        }
    }
}
