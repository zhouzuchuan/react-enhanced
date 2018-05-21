/**
 * 注入方法
 * type: 当前类型，查看ContextStore
 * limit：获取CONTEXT中指定的key
 *
 * */
import React from 'react';
import pick from 'lodash.pick';
import ContextStore from './ContextStore';
import { isString, isArray } from '../utils';

export default (inject = [], CONTEXT = []) => WrappedComponent => {
    return class HOCComponent extends React.Component {
        render() {
            if (!ContextStore) {
                console.warn('HOC传值有误！');
                return <WrappedComponent {...this.props} />;
            }

            return (
                <ContextStore.Consumer>
                    {context => {
                        const newProps = {
                            ...this.props,
                            ...(isString(inject) || isArray(inject)
                                ? pick(context.__RE__, inject)
                                : {}),
                            __CONTEXT__: pick(context.__CONTEXT__, CONTEXT)
                        };
                        return <WrappedComponent {...newProps} />;
                    }}
                </ContextStore.Consumer>
            );
        }
    };
};
