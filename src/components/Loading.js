import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import isEqual from 'lodash.isequal'
import classnames from 'classnames'
import styled from 'styled-components'
import { isNull, isArray } from '../utils'

import RE from '../store'

import { LOADING_MODEL_NAME } from '../const'

// import './loading.css'

const returnArray = (v, s = Map()) => (isArray(v) ? v : [v]).some(o => !(s.get(o) || Map()).isEmpty())

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
export default connect(
    store => ({
        loadingStore: store[LOADING_MODEL_NAME],
    }),
    null,
    ({ loadingStore }, action, { include = null, exclude = null, ...rest }) => {
        return {
            ...rest,
            update: returnUpdate(include, exclude, loadingStore),
        }
    },
)(
    class Loading extends React.Component {
        static propTypes = ['include', 'exclude'].reduce(
            (r, v) => ({ ...r, [v]: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]) }),
            {
                content: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.arrayOf(PropTypes.element),
                    PropTypes.element,
                ]),
            },
        )
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
                <WrapIn>
                    <div
                        className={classnames({
                            [className]: className,
                        })}
                    >
                        {null}
                        {cover ? null : <RequestLoading {...spin} />}
                        {content}
                    </div>
                </WrapIn>
            ) : null

            const Wrap = update ? WrapLoading : WrapEmpty

            return mask ? (
                <Wrap className={wrapClassName}
                    style={wrapStyle}
                >
                    {children}
                    {createChldren}
                </Wrap>
            ) : update ? (
                createChldren
            ) : (
                children
            )
        }
    },
)

const WrapIn = styled.div`
    text-align: center;

    & > :first-child > .sk-spinner {
        display: inline-block;
        vertical-align: middle;
    }
`

const WrapLoading = styled.div`
    position: relative;

    & > * {
        pointer-events: none;
        filter: blur(0.8px);
        opacity: 0.5;
    }

    & > ${WrapIn} {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 5;
        width: 100%;
        height: 100%;
        max-height: 300px;
        pointer-events: auto;
        filter: blur(0);
        opacity: 1;

        &::after {
            display: inline-block;
            width: 0;
            height: 100%;
            line-height: 0;
            vertical-align: middle;
            content: '';
        }

        & > :first-child {
            display: inline-block;
            vertical-align: middle;
        }
    }
`
const WrapEmpty = styled.div``
