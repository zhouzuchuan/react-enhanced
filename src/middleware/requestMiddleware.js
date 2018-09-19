import get from 'lodash.get';
import { isFunction, isArray, isObject, isString, isUndefined } from '../utils';
import { put } from 'redux-saga/effects';

const take = (obj, path) => get(obj, path);

export default (RE, { requestCallback, requestError, resultLimit }, store) => next => action => {
    // return setTimeout(() => {
    const { dispatch, getState } = store;

    if (isFunction(action)) {
        action(dispatch, getState);
        return;
    }

    const {
        request,
        will,
        error,
        callback,
        did,
        RE_PROMISE,
        __RE_PROMISE_RESOLVE__,
        __RE_PROMISE_REJECT__,
        ...rest
    } = action;

    if (!request) {
        return isEffect(rest.type, RE)
            ? new Promise((resolve, reject) => {
                  return next({
                      __RE_PROMISE_RESOLVE__: resolve,
                      __RE_PROMISE_REJECT__: reject,
                      ...rest
                  });
              })
            : next(action);
    }

    if (!isFunction(request)) {
        console.error('request must be a function!');
        return next(action);
    }

    if (isObject(will) && isString(will.type)) {
        dispatch(will);
    } else if (isString(will)) {
        dispatch({
            type: will
        });
    }

    const mergeError = error || requestError;

    const requestName = action.request.name;

    dispatch({
        type: '@@LOADING/__SET_LOADING_START__',
        payload: {
            key: requestName,
            loading: true
        }
    });

    return request()
        .then(result => {
            const { data } = result;
            const transferData = data || result;
            const limitData = isString(resultLimit)
                ? take(transferData, resultLimit)
                : isArray(resultLimit)
                    ? resultLimit.reduce((r, v) => {
                          if (!isString(v)) {
                              console.warn(`${JSON.stringify(v)} 不符合字段截取规则；请使用"result.data"这种规则！`);
                              return r;
                          }
                          return [...r, take(transferData, v) || []];
                      }, [])
                    : transferData;

            if (isUndefined(limitData)) {
                console.warn('设置的 resultLimit 获取不到有效的数据');
            }

            if (isFunction(requestCallback)) {
                requestCallback(transferData, rest, dispatch, getState);
            } else if (isString(requestCallback)) {
                dispatch({
                    type: requestCallback,
                    payload: transferData,
                    ...rest
                });
            }

            if (isObject(did) && isString(did.type)) {
                const { type, payload, ...rest2 } = did;
                dispatch({
                    type: did.type,
                    payload: isUndefined(payload) ? limitData : isFunction(payload) ? payload(limitData) : payload,
                    ...rest2
                });
            } else if (isString(did)) {
                dispatch({
                    type: did,
                    payload: limitData
                });
            }

            if (isFunction(callback)) {
                callback(limitData);
            } else if (isString(requecallbacktCallback)) {
                dispatch({
                    type: callback,
                    payload: limitData,
                    ...rest
                });
            }
            dispatch({
                type: '@@LOADING/__SET_LOADING_END__',
                payload: {
                    key: requestName,
                    loading: false
                }
            });
        })
        .catch(err => {
            if (isFunction(mergeError)) {
                mergeError(err);
            } else if (isString(mergeError)) {
                dispatch({
                    type: mergeError,
                    ...rest
                });
            }
        });
    // }, 0);
};

function isEffect(type, RE) {
    if (!type || typeof type !== 'string') return false;

    if (RE._effects[type]) {
        return true;
    }
    return false;
}
