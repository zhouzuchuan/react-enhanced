/**
 * 继承context
 * id: 仓库名
 * limit：获取CONTEXT中指定的key
 *
 * */
import React from 'react';
import pick from 'lodash.pick';
import Install from './Install';
import { isArray } from '../utils';

export default (id, limit = []) => WrappedComponent => {
    class Pull extends React.Component {
        render() {
            const { __CONTEXT__, ...props } = this.props;
            const ContextStore = __CONTEXT__[id];

            if (!ContextStore) {
                console.warn(
                    '组件${WrappedComponent.displayName} Pull 的 仓库id 不存在，请在 init 初始化中注册 warehouse！'
                );
                return <WrappedComponent {...props} />;
            }

            return (
                <ContextStore.Consumer>
                    {context => {
                        const newProps = {
                            ...props,
                            ...(isArray(limit) ? pick(context, limit) : {})
                        };
                        return <WrappedComponent {...newProps} />;
                    }}
                </ContextStore.Consumer>
            );
        }
    }
    return Install([], [id])(Pull);
};
