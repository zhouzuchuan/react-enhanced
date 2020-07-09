import get from 'lodash.get'
import {
    isFunction,
    isArray,
    isObject,
    isString,
    isUndefined,
    console,
} from '../utils'

import { LOADING_MODEL_NAME } from '../const'

const take = (obj, path) => get(obj, path)

export default (
    { requestCallback = () => true, requestError = () => null, resultLimit },
    store,
) => {
    return next => action => {
        const { dispatch, getState } = store

        if (isFunction(action)) {
            action(dispatch, getState)
            return
        }

        const {
            request,
            will,
            error,
            callback,
            failCallback,
            did,
            ...rest
        } = action

        if (!request) {
            return next(action)
        }

        if (!isFunction(request)) {
            console.error('request must be a function!')
            next(action)
            return
        }

        if (isObject(will) && isString(will.type)) {
            dispatch(will)
        } else if (isString(will)) {
            dispatch({
                type: will,
            })
        }

        const mergeError = error || requestError

        const requestName = action.request.name.split(' ').reverse()[0]

        // 生成时间戳
        const timestamp = new Date().getTime()

        dispatch({
            type: `${LOADING_MODEL_NAME}/set`,
            payload: [requestName, timestamp],
        })

        return request()
            .then(result => {
                const { data } = result
                const transferData = data || result
                const limitData = isString(resultLimit)
                    ? take(transferData, resultLimit)
                    : isArray(resultLimit)
                    ? resultLimit.reduce((r, v) => {
                          if (!isString(v)) {
                              console.warn(
                                  `${JSON.stringify(
                                      v,
                                  )} 不符合字段截取规则；请使用"result.data"这种规则！`,
                              )
                              return r
                          }
                          return [...r, take(transferData, v) || []]
                      }, [])
                    : transferData

                if (isUndefined(limitData)) {
                    console.warn('设置的 resultLimit 获取不到有效的数据')
                }

                let throttle = true

                if (isFunction(requestCallback)) {
                    throttle = requestCallback(
                        transferData,
                        rest,
                        dispatch,
                        getState,
                    )
                }

                // 如果没有请求不合格 则返回
                if (!throttle) {
                    if (isFunction(failCallback)) {
                        failCallback(transferData)
                    }
                    return
                } else {
                    if (isFunction(callback)) {
                        callback(limitData, transferData)
                    } else if (isString(callback)) {
                        dispatch({
                            type: callback,
                            payload: limitData,
                            ...rest,
                        })
                    }

                    if (isObject(did) && isString(did.type)) {
                        const { type, payload, ...rest2 } = did
                        dispatch({
                            payload: isUndefined(payload)
                                ? limitData
                                : isFunction(payload)
                                ? payload(limitData)
                                : payload,
                            ...rest2,
                            type,
                        })
                    } else if (isString(did)) {
                        dispatch({
                            type: did,
                            payload: limitData,
                        })
                    }

                    return limitData
                }
            })
            .finally(() => {
                dispatch({
                    type: LOADING_MODEL_NAME + '/remove',
                    payload: [requestName, timestamp],
                })
            })
        // .catch(err => {
        //     if (isFunction(mergeError)) {
        //         mergeError(err)
        //     } else if (isString(mergeError)) {
        //         dispatch({
        //             type: mergeError,
        //             ...rest,
        //         })
        //     }
        // })
    }
}
