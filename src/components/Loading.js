import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isEqual from 'lodash.isequal'
import classnames from 'classnames'
import { isNull, isArray } from '../utils'

import RE from '../store'

import { RE_LOADING_NAME } from '../const'

import './loading.css'

const returnArray = (v, s = {}) => (isArray(v) ? v : [v]).some(o => s[o])

const returnUpdate = (include, exclude, store) => {
    if (isNull(include)) {
        return isNull(exclude) ? true : !returnArray(exclude, store)
    } else {
        return returnArray(include, store)
    }
}
/**
 * Loading 组件
 * include/exclude (string/string) 默认为请求全触发，设置值且值为字符串, 转成数组，判断request中间层的函数名是否在数组中 有则触发
 *
 * */
class Loading extends React.Component {
    shouldComponentUpdate(np) {
        return !isEqual(np, this.props)
    }
    render() {
        const {
            children = null,
            wrapClassName = '',
            wrapStyle = {},
            update,
            mask = false,
            className = '',
            cover = false,
            content,
            spin = {},
        } = this.props

        const RequestLoading = RE.RequestLoading
        const createChldren = update ? (
            <div className="RE_loading">
                <div
                    className={classnames({
                        [className]: className,
                    })}
                >
                    {null}
                    {cover ? null : <RequestLoading {...spin} />}
                    {content}
                </div>
            </div>
        ) : null

        return mask ? (
            <div
                className={classnames('RE_loading_wrap', {
                    RE_update: update,
                    [wrapClassName]: wrapClassName,
                })}
                {...wrapStyle}
            >
                {children}
                {createChldren}
            </div>
        ) : update ? (
            createChldren
        ) : (
            children
        )
    }
}
Loading.propTypes = ['include', 'exclude'].reduce(
    (r, v) => ({ ...r, [v]: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]) }),
    { content: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.element), PropTypes.element]) },
)

export default connect(
    store => {
        return store[RE_LOADING_NAME] || {}
    },
    null,
    (loadingStore, action, { include = null, exclude = null, ...rest }) => {
        return {
            ...rest,
            update: returnUpdate(include, exclude, loadingStore),
        }
    },
)(Loading)
