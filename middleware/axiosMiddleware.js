const isFunction = f => typeof f === 'function'

export default store => next => action => {
    const { dispatch, getState } = store

    if (isFunction(action)) {
        action(dispatch, getState)
        return
    }

    const { promise, type, payload, callback, ...rest } = action

    if (!action.promise) {
        return next(action)
    }

    if (!isFunction(promise)) {
        console.error('promise must be a function')
    }

    return promise()
        .then(({ data }) => {
            const { result, status } = data
            if (status === '1') {
                location.hash = '#/'
            }
            if (type && status === '0') {
                next({
                    ...rest,
                    type,
                    payload: isFunction(payload) ? payload(result) : result
                })
            }
            callback && callback(dispatch, getState, data)
        })
        .catch(error => {
            console.error('MIDDLEWARE ERROR:', error)
        })
}
