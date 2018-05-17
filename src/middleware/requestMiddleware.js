const getType = obj =>
    Object.prototype.toString
        .call(obj)
        .slice(8, -1)
        .toLowerCase();

const isFunction = o => getType(o) === 'function';
const isObject = o => getType(o) === 'object';
const isString = o => getType(o) === 'string';
const isUndefined = o => getType(o) === 'undefined';
const isArray = o => getType(o) === 'array';

export default ({ requestCallback, requestError }, store) => next => action => {
    const { dispatch, getState } = store;

    if (isFunction(action)) {
        action(dispatch, getState);
        return;
    }

    const { request, before, error, callback, ...rest } = action;

    if (!request) {
        return next(action);
    }

    if (!isFunction(request)) {
        console.error('request must be a function!');
    }

    if (isObject(before) && isString(before.type)) {
        next(before);
    }

    const mergeCallback = callback || requestCallback;
    const mergeError = error || requestError;

    return request()
        .then(({ data }) => {
            if (isFunction(mergeCallback)) {
                mergeCallback(data, rest, dispatch, getState);
            } else if (isString(mergeCallback)) {
                next({
                    type: mergeCallback,
                    ...rest
                });
            } else {
                console.warn('请求成功，请添加处理逻辑！');
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
            } else {
                console.error('请求失败，请添加处理逻辑！');
            }
        });
};
