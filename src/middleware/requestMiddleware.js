import get from 'lodash.get';
import { isFunction, isArray, isObject, isString, isUndefined } from '../utils';

const take = (obj, path) => get(obj, path);

export default (
    { requestCallback, requestError, resultLimit },
    store
) => next => action => {
    const { dispatch, getState } = store;

    if (isFunction(action)) {
        action(dispatch, getState);
        return;
    }

    const { request, will, error, callback, did, ...rest } = action;

    if (!request) {
        return next(action);
    }

    if (!isFunction(request)) {
        console.error('request must be a function!');
    }

    if (isObject(will) && isString(will.type)) {
        next(will);
    } else if (isString(will)) {
        next({
            type: will
        });
    }

    const mergeError = error || requestError;

    return request()
        .then(result => {
            const { data } = result;
            const transferData = data || result;
            const limitData = isString(resultLimit)
                ? take(transferData, resultLimit)
                : isArray(resultLimit)
                    ? resultLimit.reduce((r, v) => {
                          if (!isString(v)) {
                              console.warn(
                                  `${JSON.stringify(
                                      v
                                  )} 不符合字段截取规则；请使用"result.data"这种规则！`
                              );
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
                next({
                    type: requestCallback,
                    payload: transferData,
                    ...rest
                });
            }

            if (isObject(did) && isString(did.type)) {
                const { type, payload, ...rest2 } = did;
                next({
                    type: did.type,
                    payload: isUndefined(payload)
                        ? limitData
                        : isFunction(payload)
                            ? payload(limitData)
                            : payload,
                    ...rest2
                });
            } else if (isString(did)) {
                next({
                    type: did,
                    payload: limitData
                });
            }

            if (isFunction(callback)) {
                callback(limitData);
            } else if (isString(requecallbacktCallback)) {
                next({
                    type: callback,
                    payload: limitData,
                    ...rest
                });
            }
        })
        .catch(err => {
            if (isFunction(mergeError)) {
                mergeError(err);
            } else if (isString(mergeError)) {
                next({
                    type: mergeError,
                    ...rest
                });
            }
        });
};
