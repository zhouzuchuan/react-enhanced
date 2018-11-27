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

const returnArray = (v, s = {}) => (isArray(v) ? v : [v]).some(o => s[o]);

const returnUpdate = (include, exclude, store) => {
    if (isNull(include)) {
        return isNull(exclude) ? true : !returnArray(exclude, store);
    } else {
        return returnArray(include, store);
    }
};

export default rl => {
    class Loading extends React.Component {
        shouldComponentUpdate(np) {
            return !isEqual(np, this.props);
        }
        render() {
            const { className = '', cover = false, content, children, update, mask = false } = this.props;

            const childrenComponent = children ? children : null;

            if (update) {
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
            return store['@@LOADING'] || {};
        },
        null,
        (loadingStore, action, { include = null, exclude = null, ...rest }) => {
            return {
                ...rest,
                update: returnUpdate(include, exclude, loadingStore)
            };
        }
    )(Loading);
};
