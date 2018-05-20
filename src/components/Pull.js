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
                console.error(
                    '当前 Pull id 不存在，请在 init warehouse 中注册！'
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
