import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isNull, isArray } from '../utils';

/**
 * Loading 组件
 * include/exclude (string/string) 默认为请求全触发，设置值且值为字符串, 转成数组，判断request中间层的函数名是否在数组中 有则触发
 *
 * */

export default rl => {
    const Loading = ({
        loading,
        loadKey,
        ukey,
        include = null,
        exclude = null,
        className,
        cover = false,
        children
    }) => {
        const temp = [include, exclude]
            .map((v, i) => {
                if (isNull(v)) return true;
                const bool = (isArray(v) ? v : [v]).includes(loadKey);
                return i ? !bool : bool;
            })
            .every(v => v);

        return !isNull(rl) && loading && temp ? (
            <div className={className}>
                {null}
                {cover ? null : rl}
                {children}
            </div>
        ) : null;
    };

    Loading.propTypes = ['include', 'exclude'].reduce(
        (r, v) => ({ ...r, [v]: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]) }),
        {}
    );

    return connect(store => {
        const { key: loadKey = '', loading } = store['@@LOADING'] || {};
        return {
            loading,
            loadKey
        };
    })(Loading);
};
