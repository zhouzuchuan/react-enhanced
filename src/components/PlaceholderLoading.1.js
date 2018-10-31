import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import { isNull, isArray } from '../utils';

import RE from '../store';

import './loading.css';

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
        _returnComponent = component => {
            const { mask = false } = this.props;
            return mask ? <div className="RE-LOADING-WRAP">{component}</div> : component;
        };
        render() {
            const {
                loading,
                className = '',
                cover = false,
                content,
                children,
                update,
                mask = false,
                loadKey
            } = this.props;

            const childrenComponent = children ? children : null;

            console.log(RE.LOADING[loadKey], loadKey);

            if (update && loading) {
                const component = (
                    <div className="RE-LOADING-WRAP">
                        <div className={className}>
                            {null}
                            {cover ? null : rl}
                            {content}
                        </div>
                    </div>
                );

                return !isNull(rl) ? (
                    mask ? (
                        <div className="RE-LOADING-CONTAINER">
                            {childrenComponent}
                            {component}
                        </div>
                    ) : (
                        component
                    )
                ) : null;
            } else {
                return mask ? <div className="RE-LOADING-WRAP">{childrenComponent}</div> : childrenComponent;
            }
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
            // console.log(
            //     loadKey,
            //     returnUpdate(include, exclude, loadKey),
            //     loading,
            //     include,
            //     exclude,
            //     JSON.stringify(RE.LOADING)
            // );
            return {
                ...rest,
                update: returnUpdate(include, exclude, loadKey),
                loading,
                loadKey
            };
        }
    )(Loading);
};
