import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import { isNull, isArray } from '../utils';

/**
 * Loading 组件
 * include/exclude (string/string) 默认为请求全触发，设置值且值为字符串, 转成数组，判断request中间层的函数名是否在数组中 有则触发
 *
 * */

const returnUpdate = (include, exclude, key) => {
    if (key === '') return false;
    if (isNull(include)) {
        return isNull(exclude) ? true : !(isArray(exclude) ? exclude : [exclude]).includes(key);
    } else {
        return (isArray(include) ? include : [include]).includes(key);
    }
};

export default rl => {
    class Loading extends React.Component {
        shouldComponentUpdate(np) {
            return np.update || !isEqual(np.children, this.props.children);
        }
        render() {
            const { loading, className, cover = false, content, children, update } = this.props;

            return update && loading ? (
                !isNull(rl) ? (
                    <div className={className}>
                        {null}
                        {cover ? null : rl}
                        {content}
                    </div>
                ) : null
            ) : children ? (
                children
            ) : null;
        }
    }

    Loading.propTypes = ['include', 'exclude'].reduce(
        (r, v) => ({ ...r, [v]: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]) }),
        { content: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.element), PropTypes.element]) }
    );

    return connect(
        store => {
            const { key: loadKey = '', loading } = store['@@LOADING'] || {};
            return {
                loading,
                loadKey
            };
        },
        null,
        ({ loading, loadKey }, action, { include = null, exclude = null, ...rest }) => {
            return {
                update: returnUpdate(include, exclude, loadKey),
                loading,
                loadKey,
                ...rest
            };
        }
    )(Loading);
};
